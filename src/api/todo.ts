import request from './request';

class TodoAPI {
  static PREFIX = '/todos';
  static fetchTodo(userId: string) {
    return request.get(`${TodoAPI.PREFIX}/${userId}`);
  }

  static addTodo(userId: string, content: string,createTime: string,deadline: string) {
    return request.post(`${TodoAPI.PREFIX}/addTodo`, {
      userId,
      content,
      createTime,
      deadline,
    });
  }
  static searchTodo(userId: string, query: string, createTime?: string,deadline?: string) {
    return request.get(
      `${TodoAPI.PREFIX}/search?userId=${userId}&query=${query}&createTime=${createTime}&deadline=${deadline}`
    );
  }
  static deleteTodo(todoId: string) {
    return request.delete(`${TodoAPI.PREFIX}/${todoId}`);
  }
  static updateTodoStatus(todoId: string) {
    return request.put(`${TodoAPI.PREFIX}/status`, {
      todoId,
    });
  }
  static updateTodoContent(todoId: string, content: string, deadline: string) {
    return request.put(`${TodoAPI.PREFIX}/content`, {
      todoId,
      content,
      deadline,
    });
  }
}

export default TodoAPI;
