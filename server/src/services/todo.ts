import Todo from '../db/models/todo';
import User from '../db/models/user';
import dayjs from 'dayjs';

export default class TodoService {
  public async addTodo(userId: string, content: string,createTime: string,deadline: string ) {
    const user = await User.findById(userId);
    const todo = new Todo({
      ID:user?.todos.length + 1,
      content,
      createTime,
      deadline
    });
    try {
      const res = await todo.save();
      user?.todos.push(res.id);
      await user?.save();
      return res;
    } catch (error) {
      throw new Error('新增失败 (￣o￣).zZ');
    }
  }
  public async deleteTodo(todoId: string) {
    try {
      return await Todo.findByIdAndDelete(todoId);
    } catch (error) {
      throw new Error('删除失败 (￣o￣).zZ');
    }
  }
  public async getAllTodos(userId: string) {
    try {
      const res = await User.findById(userId).populate('todos');
      return res?.todos;
    } catch (error) {
      throw new Error('获取失败 (￣o￣).zZ');
    }
  }
  public async updateTodoStatus(todoId: string) {
    try {
      const oldRecord = await Todo.findById(todoId);
      const record = await Todo.findByIdAndUpdate(todoId, {
        status: !oldRecord?.status,
      });
      return record;
    } catch (error) {
      throw new Error('更新状态失败 (￣o￣).zZ');
    }
  }
  public async updateTodoContent(todoId: string, content: string, deadline: string) {
    try {
      return await Todo.findByIdAndUpdate(todoId, { content, deadline });
    } catch (error) {
      throw new Error('更新内容失败 (￣o￣).zZ');
    }
  }
  public async searchTodo(userId: string, query: string) {
    try {
      return await User.findById(userId).populate({
        path: 'todos',
        match: { content: { $regex: new RegExp(query), $options: 'i' } },
      });
    } catch (error) {
      throw new Error('查询失败 (￣o￣).zZ');
    }
  }
  public async searchRangeTodo(userId: string, createTime: string,deadline: string) {
    const createTimes = dayjs(createTime).toDate().getTime();
    const deadlineTimes = dayjs(deadline).toDate().getTime();
    try {
      const data = await User.findById(userId).populate({
        path: 'todos',
      });
      data.todos = data.todos.filter((item)=>{
        const itemCreateTime =  dayjs(item.createTime).toDate().getTime();
        const itemdeadlineTime =  dayjs(item.deadline).toDate().getTime();
        return createTimes < itemCreateTime && deadlineTimes > itemdeadlineTime;
      });
      return data;
    } catch (error) {
      throw new Error('查询失败 (￣o￣).zZ');
    }
  }
}

