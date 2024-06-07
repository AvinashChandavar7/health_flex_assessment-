import { Router } from "express";

import verifyToken from "../middleware/auth.middleware";

import {
  postTweet
} from "../controllers/tweets.controller";


const router = Router();

router.post('/', verifyToken, postTweet);

export default router;