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

  return res.status(200)
    .json(new ApiResponse(200, user, "User successfully login"));
});

export { registerUser }