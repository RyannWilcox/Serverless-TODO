import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
//import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { createAttachmentPresignedUrl, updateAttachmentUrl } from '../../helpers/todos'

const logger = createLogger('generateUploadUrl')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    logger.info('Received event => ', event)
    
    await createAttachmentPresignedUrl(todoId)
    const attachUrl = await updateAttachmentUrl(todoId)
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        uploadUrl: attachUrl
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
