import User from '../models/userModel.js';
import Friend from '../models/friendModel.js'; // Import the Friend model
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
  const { nickname, fullname, phone, password } = req.body;
  const userExist = await User.findOne({ phone });

  if (userExist) {
    res.status(400);
    throw new Error('User already Exist');
  }

  const user = await User.create({ nickname, fullname, phone, password });

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
    user.nickname = req.body.nickname || user.nickname;
    user.gender = req.body.gender || user.gender;
    user.birthday = req.body.birthday || user.birthday;
    // if (req.body.password) {
    //   user.password = req.body.password;
    // }

    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      nickname: updatedUser.nickname,
      
      gender: updatedUser.gender,
      birthday: updatedUser.birthday,
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
      nickname: user.nickname,
      gender: user.gender,
      birthday: user.birthday,
      phone: user.phone,
      token: generateToken(user._id),

    });
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});

// Find user by phone
const findUserByPhone = async (req, res) => {
  console.log('findUserByPhone-------------------------------');
  const { phone } = req.query;

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friends = await Friend.findOne({
      $and: [
        { requester: req.user._id },
        { recipient: user._id},
      ],
    })
    .populate('recipient', 'nickname fullname phone');
    console.log('findUser', user);

    res.status(200).json({
      user,
      friends,
  });
  } catch (error) {
    res.status(500).json({ message: 'Failed to find user', error });
  }
};

export { login, register, getUsers, updateUserProfile, getUserProfile, findUserByPhone };
