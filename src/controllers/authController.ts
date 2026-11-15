import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: '30d', 
  });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, passwordKey } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordKey, salt);

    const user = await User.create({
      username,
      email,
      passwordKey: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: (error as Error).message });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, passwordKey } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(passwordKey, user.passwordKey))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: (error as Error).message });
  }
};


export const getUserProfile = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.id).select('-passwordKey');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: (error as Error).message });
  }
};