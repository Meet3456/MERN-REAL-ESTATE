import User from "../models/user_model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res ,next) => {
  // Taking the user credentials from req.body:
  const { username, email, password } = req.body;
  // Hashing the user password , to store in the DB:
  const hashedpassword = bcryptjs.hashSync(password, 10);
  // passing the credentials to the User model defined which is based on UserSchema:
  const newUser = new User({ username, email, password: hashedpassword });
  // saving into database:
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};
