import express from 'express';
import { login, logout, signup, updateProfile, checkAuth} from '../controllers/auth.controller.js';
import { protectRoute} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

// if user wants to update their profile we first check if they are logged in
router.put("/update-profile", protectRoute, updateProfile)

// to check if the user is logged in or not
router.get("/check", protectRoute, checkAuth);

export default router;