import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req,res)=>{
  const {email, password} = req.body;
  try {
    const isExistingUser = await User.findOne({email});
    if(!isExistingUser) return res.status(404).json({message:"User doesn't exist."})
    const isPasswordCorrect = await bcrypt.compare(password, isExistingUser.password);
    if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials."})
    const token = jwt.sign({email: isExistingUser.email, id: isExistingUser._id}, 'test', {expiresIn: "24h"})
    res.status(200).json({result: isExistingUser, token});
  } catch (error) {
    res.status(500).json({message: "Something went  wrong."});
  }
}

export const signup = async (req,res)=>{
  const {email, password, confirmPassword, nickname, selectedFile} = req.body;
  try {
    const isExistingUser = await User.findOne({$or:[{email},{nickname}]});
    if(isExistingUser) return res.status(400).json({message: "User already exist."});
    if(password !== confirmPassword) return res.status(400).json({message:"Passwords don't match"});
    const hashedPassword = await bcrypt.hash(password,12);
    const result = await User.create({email, password: hashedPassword, nickname, selectedFile});
    const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn:"24h"})
    res.status(201).json({result: result, token});
  } catch (error) {
    res.status(500).json({message:"Somenthing went wrong."});
  }
}