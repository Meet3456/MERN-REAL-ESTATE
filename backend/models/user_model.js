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

    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  { timestamps: true }
);

// Creating a model using userSchema  for a new User
const User = mongoose.model("User", userSchema);

// Exporting the model , so that we can import it anywhere and create New users
export default User;
