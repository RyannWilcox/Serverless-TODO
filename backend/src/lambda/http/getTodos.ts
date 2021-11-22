import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getTodosForUser as getTodosForUser } from '../../helpers/todos'
import { createLogger } from '../../utils/logger'

const logger = createLogger('getTodo')

// TODO: Get all TODO items for a current user
export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    logger.info('getting todos')
    const auth = event.headers.Authorization
    const split = auth.split(' ')
    const jwtToken = split[1]
    
    const items = await getTodosForUser(jwtToken)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
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
