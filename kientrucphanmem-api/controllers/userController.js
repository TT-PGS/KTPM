import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

//@desc     Auth User & Get Token
//@route    POST api/users/login
//@access   Public
const login = asyncHandler(async (req, res) => {
  console.log('login-------------------------------', req.body);
  const { phoneNumber, password } = req.body;
  const user = await User.findOne({ phone: phoneNumber });

  console.log('user', user.password);
  console.log('password', password);
  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      fullname: user.fullname,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or Password');
  }
});

//@desc     REGISTER User & Get Token
//@route    POST api/users/register
//@access   Public
const register = asyncHandler(async (req, res) => {
  console.log('register-------------------------------');
  console.log(req.body);
  const { fullname, phone, password } = req.body;
  const userExist = await User.findOne({ phone });

  if (userExist) {
    res.status(400);
    throw new Error('User already Exist');
  }

  const user = await User.create({ fullname, phone, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

//@desc     Get all Users
//@route    GET api/users
//@access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc     Update User Profile
//@route    PUT api/users/profile/:id
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fullname = req.body.fullname || user.fullname;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      phone: updatedUser.phone,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    return res.json({
      _id: user._id,
      fullname: user.fullname,
      phone: user.phone,
      token: generateToken(user._id),

    });
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});

export { login, register, getUsers, updateUserProfile, getUserProfile };
