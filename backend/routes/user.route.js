import express from 'express'
import { test } from '../controllers/user_contoller.js';

const router = express.Router();

// Define the signup route and the controller function to be called
router.get("/test",test)

// Since we are exporting it as an default, we can import it as any name in the index.js
export default router;

// Controller -> Routes -> Index.js