import { TodosAccess } from './todosAccess'
//import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
//import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
//import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
//import * as createError from 'http-errors'
import { parseUserId } from '../auth/utils';

// TODO: Implement businessLogic

const todosAccess = new TodosAccess()

export async function getTodosForUser (token: string): Promise<TodoItem[]> {
  const userid = parseUserId(token)
  return await todosAccess.getAllTodos(userid)
}

export async function createTodo (createRequest: CreateTodoRequest, jwtToken: string): Promise<TodoItem> {
  const userId = parseUserId(jwtToken)
  const todoId = uuid.v4()
  
  return await todosAccess.createTodo({
    userId: userId,
    todoId: todoId,
    createdAt: new Date().toISOString(),
    done: false,
    name: createRequest.name,
    attachmentUrl: null,
    dueDate: createRequest.dueDate
  })
}

