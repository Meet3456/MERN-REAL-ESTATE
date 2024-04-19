import mongoose from "mongoose";

// Defines The Schema of how a new user will Look like:
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      tolowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Creating a model using userSchema  for a new User
const User = mongoose.model('User',userSchema);

// Exporting the model , so that we can import it anywhere and create New users
export default User;
