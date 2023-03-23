import { Context } from 'koa';
import {request, tags, prefix, summary, orderAll, body,query,deprecatedAll } from 'koa-swagger-decorator';
import CommentService from '../services/comment';
import { StatusCode } from '../utils/enum';
import createRes from '../utils/response';

const commentService = new CommentService();
const tag = tags(['Comment']);
@prefix('/comment')
@orderAll(3)
@deprecatedAll
export default class CommentRouter {
  @request('get', '/getAllComment')
  @summary('获取任务评论')
  @tag
  @query({
    todoId: { type: 'string', description: '任务id' },
  })
  async getComment(ctx: Context) {
    const todoId = ctx.params.todoId;
    try {
      const data = await commentService.getComment(todoId);
      createRes({
        ctx,
        data,
      });
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  }

  @request('post', '/comment')
  @summary('添加任务评论')
  @tag
  @body({
    todoId: { type: 'string', description: '任务id' },
    comment: { type: 'string', description: '评论' },
  })
  async comment(ctx: Context) {
    const payload: any = ctx.request.body;
    const { todoId, comment } = payload;
    try {
      const data = await commentService.addComment(todoId, comment);
      if (data) {
        createRes({
          ctx,
          statusCode: StatusCode.Created,
        });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  }
}
