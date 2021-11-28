import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('AttachmentUtils')

// TODO: Implement the fileStogare logic

export class AttachmentUtils {
  constructor (
    private readonly s3 = new XAWS.S3({signatureVersion: 'v4'}),
    private readonly bucket = process.env.ATTACHMENT_S3_BUCKET,
    //private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
    ){}

    async getUploadUrl(todoId: string) : Promise<string>{
      return this.s3.getSignedUrl('putObject',{
        Bucket: this.bucket,
        Key: todoId,
        Expires: 3000
      })

    }

    async getAttachmentUrl(id: string): Promise<string>{
      logger.info('Creating attachment url for ' + id)
      return `https://${this.bucket}.s3.us-east-1.amazonaws.com/${id}`
    }
}