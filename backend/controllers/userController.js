import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ name, email, password });

    // Save user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("myemail",email);
  console.log("mypassword",req.body.password);

  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log('Entered password:', typeof password, password);
      console.log('Stored hashed password:', typeof user.password, user.password);
    }
    
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.log("Error in loginUser:", error);
    res.status(400).json({ message: error.message });
  }
};
