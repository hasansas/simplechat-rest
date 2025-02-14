/**
 * File Upload
 */

'use strict'

import path from 'path'
import fileUpload from 'express-fileupload'

// Max file size (MB)
const maxFileSize = 2

export const upload = fileUpload({
  createParentPath: true,
  limits: {
    fileSize: 1024 * 1024 * maxFileSize
  },
  abortOnLimit: true,
  useTempFiles: true,
  tempFileDir: path.join(path.resolve(__dirname, '../'), '/.tmp'),
  limitHandler: function (req, res, next) {
    const _error = {
      message: 'File size limit has been reached'
    }
    return SEND_RESPONSE.error({ res, statusCode: HTTP_RESPONSE.status.badRequest, error: _error })
  }
})

export const allowedTypes = {
  image: ['.png', '.jpg', '.jpeg', '.webp'],
  document: ['.doc', '.pdf', '.xlsx', '.xls'],
  video: ['.mp4']
}
