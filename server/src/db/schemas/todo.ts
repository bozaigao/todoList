import { Document, Schema } from 'mongoose';
import { IComment } from './comment';

export interface ITodo extends Document {
  ID: {
    type: Number,
    unique: true,
  };
  content: string;
  status: boolean;
  createTime: string;
  deadline: string;
  comments: IComment[];
}

export const TodoSchema: Schema = new Schema({
  ID: Number,
  content: String,
  status: {
    type: Boolean,
    default: false,
  },
  createTime: String,
  deadline: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

TodoSchema.index({ content: 'text' });
