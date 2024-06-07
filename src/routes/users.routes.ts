import { Router } from "express";

import verifyToken from "../middleware/auth.middleware";

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserTimeline
} from "../controllers/users.controller";


const router = Router();


router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser)

router.get('/:userId/timeline', verifyToken, getUserTimeline);



export default router;