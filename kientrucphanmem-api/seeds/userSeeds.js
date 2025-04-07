import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import connectDb from '../db.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDb();

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany();

    // Create sample users
    const users = [
      {
        nickname: 'user1',
        fullname: 'User One',
        gender: 'Nam',
        birthday: '2000-01-01',
        phone: '1234567890',
        password: 'password1',
      },
      {
        nickname: 'user2',
        fullname: 'User Two',
        gender: 'Nam',
        birthday: '2000-01-01',
        phone: '1234567891',
        password: 'password2',
      },
      {
        nickname: 'user3',
        fullname: 'User Three',
        gender: 'Nam',
        birthday: '2000-01-01',
        phone: '1234567892',
        password: 'password3',
      },
      {
        nickname: 'user4',
        fullname: 'User Four',
        gender: 'Nam',
        birthday: '2000-01-01',
        phone: '1234567893',
        password: 'password4',
      },
      {
        nickname: 'user5',
        fullname: 'User Five',
        gender: 'Nam',
        birthday: '2000-01-01',
        phone: '1234567894',
        password: 'password5',
      },
      {
        nickname: 'user6',
        fullname: 'User Six',
        gender: 'Nam',
        birthday: '2000-01-01',
        phone: '1234567895',
        password: 'password6',
      },
      {
        nickname: 'user7',
        fullname: 'User Seven',
        gender: 'Nam',
        birthday: '2000-01-01',
        phone: '1234567896',
        password: 'password7',
      },
      {
        nickname: 'user8',
        fullname: 'User Eight',
        gender: 'Nam',
        birthday: '2000-01-01',
        phone: '1234567897',
        password: 'password8',
      },
      {
        nickname: 'user9',
        fullname: 'User Nine',
        gender: 'Nam',
        birthday: '2000-01-01',
        phone: '1234567898',
        password: 'password9',
      },
      {
        nickname: 'user10',
        fullname: 'User Ten',
        gender: 'Nam',
        birthday: '2000-01-01',
        phone: '1234567899',
        password: 'password10',
      },
    ];

    // Insert users into the database
    for (const user of users) {
      const newUser = new User(user);
      await newUser.save();
    }

    console.log('Users seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
