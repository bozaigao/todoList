import Todo from '../db/models/todo';
import Comment from '../db/models/comment';

export default class CommentService {
  public async getComment(todoId: string) {
    try {
        const res = await Todo.findById(todoId).populate('comments');
        return res?.comments;
      } catch (error) {
        throw new Error('获取失败 (￣o￣).zZ');
      }
  }

  public async addComment(todoId: string,comment: string) {
    const todo = await Todo.findById(todoId);
    const data = new Comment({
    comment
    });
    try {
      const res = await data.save();
      todo?.comments.push(res.id);
      await todo?.save();
      return res;
    } catch (error) {
      throw new Error('新增失败 (￣o￣).zZ');
    }
  }

}
