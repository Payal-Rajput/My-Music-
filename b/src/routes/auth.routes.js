import express from 'express';
const router=express.Router();
import {registerUser,loginUser,me} from '../controllers/auth.controller.js';


router.post('/register',registerUser);
router.post('/login',loginUser)
router.get('/me',me)

export default router;

