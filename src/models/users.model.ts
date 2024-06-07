import mongoose, { Schema, models, model, Document } from "mongoose";
import bcrypt from 'bcryptjs';

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

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }

});


const User = models.User || model<IUser>("User", userSchema);

export default User;