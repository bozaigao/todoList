import { Context } from 'koa';
import TodoService from '../services/todo';
import { StatusCode } from '../utils/enum';
import createRes from '../utils/response';
import {request, tags, prefix, summary,query, orderAll,body } from 'koa-swagger-decorator';

const todoService = new TodoService();
const tag = tags(['Todo']);
@prefix('/todos')
@orderAll(2)
export default class TodoRouter {
  @request('get', '/search')
  @summary('根据关键字搜索todo')
  @tag
  @query({
    query: { type: 'string', description: '搜索关键字' },
    createTime: { type: 'string', description: '搜索关键字' },
    deadline: { type: 'string', description: '搜索关键字' }
  })
  async searchTodo(ctx: Context) {
    const { userId, query,createTime, deadline } = ctx.query;
    try {
      if(query){
        const data = await todoService.searchTodo(
          userId as string,
          query as string
        );
        if (data) {
          createRes({
            ctx,
            data,
          });
        }
      }else{
        const data = await todoService.searchRangeTodo(
          userId as string,
          createTime as string,
          deadline as string,
        );
        if (data) {
          createRes({
            ctx,
            data,
          });
        }
      }
     
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  }

  @request('get', '/:userId')
  @summary('根据用户id获取所有todos')
  @tag
  @query({
    userId: { type: 'string', description: '用户id' }
  })
  async getTodos(ctx: Context) {
    const userId = ctx.params.userId;
    try {
      const data = await todoService.getAllTodos(userId);
      if (data) {
        createRes({
          ctx,
          data,
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

  @request('put', '/status')
  @summary('更新任务状态')
  @tag
  @body({
    todoId: { type: 'string', description: '任务id' }
  })
  async updateStatus(ctx: Context) {
    const payload: any = ctx.request.body;
    const { todoId } = payload;
    try {
      const data = await todoService.updateTodoStatus(todoId);
      if (data) {
        createRes({ ctx, statusCode: StatusCode.Accepted });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  }

  @request('put', '/content')
  @summary('更新任务内容')
  @tag
  @body({
    todoId: { type: 'string', description: '任务id' },
    content: { type: 'string', description: '任务内容' },
    deadline: { type: 'string', description: '任务截止时间' },
  })
  async updateContent(ctx: Context) {
    const payload: any = ctx.request.body;
    const { todoId, content, deadline } = payload;
    try {
      const data = await todoService.updateTodoContent(todoId, content, deadline);
      if (data) {
        createRes({ ctx, statusCode: StatusCode.Accepted });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  }

  @request('post', '/addTodo')
  @summary('添加任务')
  @tag
  @body({
    userId: { type: 'string', description: '用户id' },
    content: { type: 'string', description: '任务内容' },
    createTime: { type: 'string', description: '任务创建时间' },
    deadline: { type: 'string', description: '任务截止时间' },
  })
  async addTodo(ctx: Context) {
    const payload: any = ctx.request.body;
    const { userId, content, createTime,deadline } = payload;
    try {
      const data = await todoService.addTodo(userId, content,createTime,deadline);
      if (data) {
        createRes({
          ctx,
          statusCode: StatusCode.Created,
          data,
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

  @request('delete', '/:todoId')
  @summary('删除任务')
  @tag
  @query({
    todoId: { type: 'string', description: '任务id' },
  })
  async deleteTodo(ctx: Context) {
    const todoId = ctx.params.todoId;
    try {
      const data = await todoService.deleteTodo(todoId);
      if (data) {
        createRes({ ctx, statusCode: StatusCode.NoContent });
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
