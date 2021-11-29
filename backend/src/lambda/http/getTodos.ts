import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getTodosForUser as getTodosForUser } from '../../helpers/todos'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const logger = createLogger('getTodos')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    logger.info('Getting todos')
    
    const userId = getUserId(event)
    
    const items = await getTodosForUser(userId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: items
      })
    }
})

handler.use(
  cors({
    credentials: true
  })
)
