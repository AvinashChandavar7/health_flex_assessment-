import mongoose, { Schema, models, model, Document } from "mongoose";


export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, "A user must have a user name"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: [true, "Please provide passwords."],
      minlength: 8,
    },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;