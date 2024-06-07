import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import Tweet from "../models/tweets.model";

const postTweet = asyncHandler(async (req, res) => {
  //#swagger.tags = ['Tweet']

  const { text } = req.body;
  const userId = req.userId;

  if (!userId || !text) {
    throw new ApiError(400, "User ID and text are required");
  }

  const newTweet = await Tweet.create(
    { userId, text, createdAt: new Date() }
  );

  if (!newTweet) {
    throw new ApiError(500, "Failed to save tweet");
  }

  return res.status(200)
    .json(new ApiResponse(200, newTweet, "Tweet posted successfully"));
})

export { postTweet }