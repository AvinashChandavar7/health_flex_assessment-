import Tweet from "../models/tweets.model";
import User from "../models/users.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";


const registerUser = asyncHandler(async (req, res) => {
  //#swagger.tags = ['User-Auth']

  const { username, password, } = req.body;

  if ([username, password,].some(
    (field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field is required")
  }

  const exitedUser = await User.findOne({ username: username });

  if (exitedUser) {
    throw new ApiError(400, "User username already exited")
  }

  const user = await User.create({ username, password, });

  if (!user) {
    throw new ApiError(400, "Invalid user")
  }

  const token = user.generateRefreshToken();

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  };

  return res.status(200)
    .cookie("auth_Token", token, options)
    .json(new ApiResponse(200, { user: user, token }, "User successfully login"));
});

const loginUser = asyncHandler(async (req, res) => {
  //#swagger.tags = ['User-Auth']

  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Please provide username or password")
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const token = user.generateRefreshToken();

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  };


  return res.status(200)
    .cookie("auth_Token", token, options)
    .json(new ApiResponse(200, { userId: user._id }, "User successfully login"));
})

const logoutUser = asyncHandler(async (req, res) => {
  //#swagger.tags = ['User-Auth']

  const options = {
    httpOnly: true,
    expires: new Date(0)
  };

  return res.status(200)
    .cookie("auth_Token", "", options)
    .json(new ApiResponse(200, "User successfully LogOut"));
})

const getUserTimeline = asyncHandler(async (req, res) => {
  //#swagger.tags = ['User']
  const { userId } = req.params
  const id = req.userId;

  const cursor = req.query.cursor as string;
  const limit = parseInt(req.query.limit as string) || 10;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const query: any = { userId };

  if (cursor) {

    if (isNaN(Date.parse(cursor))) {
      throw new ApiError(400, "Invalid cursor format");
    }

    query.createdAt = { $lt: new Date(cursor) };
  }

  const tweets = await Tweet.find(query)
    .select("-updatedAt -__v")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  if (!tweets || tweets.length === 0) {
    throw new ApiError(404, "No tweets found for the user");
  }

  const newCursor = tweets.length > 0 ? tweets[tweets.length - 1].createdAt : null;

  const data = {
    total: tweets.length,
    nextCursor: newCursor,
    tweets,
  }

  return res.status(200)
    .json(new ApiResponse(200, data, "User successfully getting Timeline"));
})


export {
  registerUser,
  loginUser,
  logoutUser,

  getUserTimeline
}