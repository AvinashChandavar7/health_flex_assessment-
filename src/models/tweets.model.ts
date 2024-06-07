import mongoose, { Schema, models, model, Document } from "mongoose";


export interface ITweet extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

const tweetSchema: Schema<ITweet> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'UserID is required'],
      index: true,
    },
    text: {
      type: String,
      required: [true, 'Text field is required'],
      minlength: [2, 'Text must be at least 2 character long'],
      maxlength: [200, 'Text cannot exceed 200 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  { timestamps: true }
);


const Tweet = models.Tweet || model<ITweet>("Tweet", tweetSchema);

export default Tweet;