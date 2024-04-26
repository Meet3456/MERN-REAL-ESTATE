import User from "../models/user_model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiresponse.js";

export const signup = async (req, res, next) => {
  // Taking the user credentials from req.body:
  const { username, email, password } = req.body;

  // Hashing the user password , to store in the DB:
  const hashedpassword = bcryptjs.hashSync(password, 10);

  // passing the credentials to the User model defined which is based on UserSchema:
  const newUser = new User({ username, email, password: hashedpassword });

  // saving into database:
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  // Taking the user credentials from req.body:
  const { email, password } = req.body;
  // Finding the user in the database:
  try {
    const validUser = await User.findOne({ email });
    // If user not found:
    if (!validUser) {
      throw errorHandler(404, "User not found...Enter Correct Email!");
    }

    // If user found, checking the password entered by the user with the hashed password in the database(password):
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      throw errorHandler(410, "Invalid credentials!");
    }
    // generating the token for the user:
    const token = jwt.sign(
      { email: validUser.email, id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    // sending the token as cookie: and user details as response:excluding password
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(new ApiResponse(200, rest, "User logged in successfully!"));
  } catch (error) {
    next(error);
  }
};

// Google OAuth: Checks if the user is already present in the database via google sign in we sign in the user, if not creates a new user
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // If user not found, creating a new user with the google credentials:and generating a random password(as google signin response dosent return password)

      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
          
        // The data send from frontend is stored in req.body
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
