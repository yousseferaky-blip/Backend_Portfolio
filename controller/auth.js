const UserSchema = require('../model/auth')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.Signup = async (req, res, next) => {
    const { name,  email, password } = req.body;

    try {
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const HashedPassword = await bcrypt.hashSync(password, 10);
        const newUser = new UserSchema({
            name,
            email,
            password:HashedPassword
        });
        await newUser.save();
        const token = await jwt.sign(
          { _id: newUser._id, role: newUser.role },
          process.env.JWT_SECRET,
          { expiresIn: '7d', algorithm: 'HS256' }
        );

        return res.status(201).json({  newUser, token  });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.SignIn = async (req, res, next) => {
    try{
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({ message: 'Email and Password are required ' });
    }
  
    const user = await UserSchema.findOne({ email });
    if (user) {
      const MatchPassword = await bcrypt.compare(password, user.password);
      if (MatchPassword) {
        const token = jwt.sign(
          { _id: user._id, name: user.name, email: user.email,role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "3d" }
        );
        const { password, ...info } = user._doc
        res.cookie("token", token).status(200).json({token,info});
      } else {
        return res.status(400).json({ message: "Incorrect Password Or Email" });
      }
    } else {
      return res.status(401).json({ message: "Notfound Email Or Password" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

exports.LogOut = async (req, res) => {
    try {
      res
        .clearCookie("token", { sameSite: "none", secure: true })
        .status(200)
        .json("User logged out successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
exports.Refetch = async (req, res)=>{
    const token = req.cookies.token
    jwt.verify(token,process.env.JWT_SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
  }

