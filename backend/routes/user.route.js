import express from 'express'
import { test,updateUser } from '../controllers/user_contoller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Define the signup route and the controller function to be called
router.get("/test",test)


router.post('/update/:id', verifyToken, updateUser)

// Since we are exporting it as an default, we can import it as any name in the index.js
export default router;

// Controller -> Routes -> Index.js 