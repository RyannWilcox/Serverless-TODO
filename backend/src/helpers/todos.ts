import { TodosAccess } from './todosAccess'
import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
//import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
//import * as createError from 'http-errors'

const logger = createLogger('todos')

const todosAccess = new TodosAccess()
const attachmentUtil = new AttachmentUtils()

export async function getTodosForUser (userId: string): Promise<TodoItem[]> {
  logger.info('Retrieving TODOs for user',userId)
  return await todosAccess.getAllTodos(userId)
}

export async function createTodo (createRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
  logger.info('Creating TODO for user',userId)
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

export async function createAttachmentPresignedUrl (todoId: string): Promise<string> {
  const url = await attachmentUtil.getUploadUrl(todoId)
  logger.info('creating presigned url for -> ' + todoId)
  return url
}

export async function updateAttachmentUrl(todoId: string) {
  const todoItem = await todosAccess.getTodo(todoId)
  const attachUrl = await attachmentUtil.getAttachmentUrl(todoId)

  await todosAccess.updateTodoWithURL(todoItem,attachUrl)
  
  return attachUrl
}
