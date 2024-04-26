import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({
    message: "Hellooo Worldddd",
  });
};

export const updateUser = async (req, res, next) => {
  // params id is the id of the user to be updated from the /update/:id route and req.user.id is the id of the user who is logged in
  // If the id of the user to be updated is not equal to the id of the user who is logged in, return an error
  if (req.params.id !== req.user.id) {
    return next(errorHandler(403, "Forbidden"));
  }
  // else: update the user details
  try {
    if (req.body.password) {
      req.body.password = await bcryptjs.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      // Find the user by id and update the details
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    // Return the updated user details except the password
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
