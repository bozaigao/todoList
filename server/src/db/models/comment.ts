import { model } from 'mongoose';

import { CommentSchema, IComment } from '../schemas/comment';

export default model<IComment>('Comment', CommentSchema);
