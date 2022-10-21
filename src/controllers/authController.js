const { User } = require('../models');
const jwt = require("../utils/jwt")

exports.register = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    const existingUser = await User.findOne({
        email
    });

    if (existingUser) {
      res.status(409).send('Email is already taken');
      return;
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
    });
const payload = {
  _id: user._id
}
    const token = jwt.generateJwt(payload);

    res.json({
      user,
      token,
    });
  } 
  catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.login = async (req, res, next) => {
  try {
 
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!email) {
      res.status(401).send("This email doesn't exist yet");
      return;
    }
    const isValidPassword = await user.validatePassword(password);

    if(!isValidPassword) {
      res.status(401).send('email or password are incorrectly');
      return;
    }

    const payload = {
      _id: user._id,
    };

    const token = jwt.generateJwt(payload);
    res.json({
      message: 'User successfully authorized',
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.getProfile = async (req, res, next) => {

  
    try {
        res.json(req.user);
      } catch (error) {
        next(error);
      }


};

exports.logout = async (req, res, next) => {

    try {
        req.user.token = null;
        await req.user.save();
        res.json(req.user);
      } catch (error) {
        next(error);
      }
  

};