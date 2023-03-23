import { Context } from 'koa';
import {request, tags, prefix, summary, orderAll, body } from 'koa-swagger-decorator';
import UserService from '../services/user';
import { StatusCode } from '../utils/enum';
import createRes from '../utils/response';

const userService = new UserService();
const tag = tags(['User']);
@prefix('/users')
@orderAll(1)
export default class UserRouter {
  @request('post', '/login')
  @summary('用户登录')
  @tag
  @body({
    username: { type: 'string', description: '用户名' },
    password: { type: 'string', description: '密码' },
  })
  async login(ctx: Context) {
    const payload: any = ctx.request.body;
    const { username, password } = payload;
    try {
      const user = await userService.validUser(username, password);
      createRes({
        ctx,
        data: {
          userId: user._id,
          username: user.usr,
        },
      });
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  }

  @request('post', '/register')
  @summary('用户注册')
  @tag
  @body({
    username: { type: 'string', description: '用户名' },
    password: { type: 'string', description: '密码' },
  })
  async register(ctx: Context) {
    const payload: any = ctx.request.body;
    const { username, password } = payload;
    try {
      const data = await userService.addUser(username, password);
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
