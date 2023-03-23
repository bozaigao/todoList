import { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  userId: string;
  userName: string;
  userPic: string;
  comment: string;
  commentTime: string;
}

export const CommentSchema: Schema = new Schema({
    userId: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPic: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
  },
  commentTime: {
    type: String,
    required: true,
  },
});
