import {
  ADD_TODO,
  CLEAR_TODO,
  DELETE_TODO,
  FETCH_TODO,
  SEARCH_TODO,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from './types';

export const addTodo = (userId: string, content: string, createTime: string,deadline: string) => ({
  type: ADD_TODO,
  payload: { userId, content, createTime, deadline },
});

export const fetchTodo = (userId: string) => ({
  type: FETCH_TODO,
  payload: { userId },
});

export const searchTodo = (userId: string, query: string,createTime?: string, deadline?: string) => ({
  type: SEARCH_TODO,
  payload: { userId, query, createTime, deadline },
});

export const deleteTodo = (todoId: string) => ({
  type: DELETE_TODO,
  payload: { todoId },
});

export const updateTodoStatus = (todoId: string) => ({
  type: UPDATE_TODO_STATUS,
  payload: { todoId },
});

export const updateTodoContent = (todoId: string, content: string, deadline:string) => ({
  type: UPDATE_TODO_CONTENT,
  payload: { todoId, content, deadline },
});

export const clearTodo = () => ({
  type: CLEAR_TODO,
});
