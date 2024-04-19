import express from "express";
import { signup, signin } from "../controllers/auth_controller.js";

// Create an individual router for the auth routes
const router = express.Router();

// Define the signup route and the controller function to be called
router.post("/signup", signup);

// Define the signin route and the controller function to be called
router.post("/signin", signin);

// Since we are expoerting it as an default, we can import it as any name in the index.js
export default router;
