/**
* Chats Controller
*/

'use strict'

import ioMessage from '../../helpers/io-message.js'
import stringHex from '../../helpers/string_hex'

class ChatsController {
  constructor ({ req, res }) {
    this.request = req
    this.query = req.query
    this.res = res
    this.clientsModel = DB.clients
    this.chatsModel = DB.chats
    this.chatsConversationModel = DB.chatsConversation
  }

  /**
   * Chat Auth
   *
   * @param {string} key
   * @return {Object} HTTP Response
   */
  async auth () {
    try {
      // validate request
      const errors = EXPRESS_VALIDATOR.validationResult(this.request)
      if (!errors.isEmpty()) {
        const error = {
          errors: errors.array()
        }
        return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.badRequest, error })
      }

      // get client
      const getClient = await this.clientsModel
        .findOne({
          where: {
            sdkKey: this.request.body.sdkKey
          },
          attributes: ['id']
        })

      if (getClient === null) {
        return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.unauthorized, error: { message: 'Invalid authorization token' } })
      }

      // success response
      const clientId = stringHex.toHex(getClient.id)
      return SEND_RESPONSE.success({ res: this.res, statusCode: HTTP_RESPONSE.status.ok, data: { clientId: clientId } })
    } catch (error) {
      return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.internalServerError, error: error })
    }
  }

  /**
   * Send message
   *
   * @param {string} from
   * @param {Object} message
   * @return {Object} HTTP Response
   */
  async sendMessage () {
    try {
      // Auth
      const sdkKey = this.request.headers['sdk-key']
      if (!sdkKey) {
        return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.unauthorized, error: { message: 'No SDK key provided' } })
      }

      // get client
      const getClient = await this.clientsModel
        .findOne({
          where: {
            sdkKey: sdkKey
          },
          attributes: ['id']
        })

      if (getClient === null) {
        return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.unauthorized, error: { message: 'Invalid authorization token' } })
      }

      // validate request
      const errors = EXPRESS_VALIDATOR.validationResult(this.request)
      if (!errors.isEmpty()) {
        const error = {
          errors: errors.array()
        }
        return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.badRequest, error })
      }

      // Send message
      const sendMessage = await DB.sequelize.transaction(async (t) => {
        const clientId = getClient.id
        // const clientUserId = this.request.body.from.refId
        const clientUser = this.request.body.from.user
        const clientUserId = clientUser === 'guest' ? this.request.body.from.refId : stringHex.toHex(clientId)
        const message = this.request.body.message

        // user name
        // TODO: change admin to actual user name
        const clientUserName = clientUser === 'guest' ? 'Guest - ' + Math.floor(1000 + Math.random() * 9000) : 'admin'

        // get chat
        const getChat = await this.chatsModel
          .findOne({
            where: {
              clientId: clientId,
              clientUserId: clientUserId
            },
            attributes: ['id']
          }, { transaction: t })

        let chatId = getChat?.id || null

        // create chat if no existing chat
        if (chatId === null) {
          const _chat = {
            clientId: clientId,
            clientUserId: clientUserId,
            clientUserName: clientUserName,
            lastMessage: message.body
          }

          const createChat = await this.chatsModel.create(_chat, { transaction: t })
          chatId = createChat.id
        }

        // create chat conversation
        const _chatConversation = {
          chatId: chatId,
          message: message,
          user: clientUser,
          refId: clientUserId
        }

        const createMessage = await this.chatsConversationModel.create(_chatConversation, { transaction: t })
        const messageId = createMessage.id

        // update chat
        const updatedAt = Date.now()
        await this.chatsModel.update(
          {
            lastMessage: message.body,
            updatedAt: updatedAt
          },
          { where: { id: chatId } },
          { transaction: t }
        )

        // send message
        const chatData = {
          chatId: chatId,
          clientUserId: clientUserId,
          clientUserName: clientUserName,
          message: {
            ...{
              id: messageId,
              from: {
                user: clientUser,
                refId: clientUserId
              }
            },
            ...message
          },
          lastMessage: message.body,
          updatedAt: updatedAt
        }

        // Send IO message
        const ioClientId = stringHex.toHex(clientId)
        const sendTo = this.request.body.sendTo || ioClientId
        ioMessage({
          name: 'chat_message',
          clientId: sendTo,
          message: {
            event: 'incoming',
            data: chatData
          }
        })

        // transaction success
        return { success: true, data: chatData }
      })
        .catch((error) => {
          return { success: false, error }
        })

      if (!sendMessage.success) {
        return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.internalServerError, error: sendMessage.error })
      }

      // success response
      return SEND_RESPONSE.success({ res: this.res, statusCode: HTTP_RESPONSE.status.ok, data: sendMessage.data })
    } catch (error) {
      return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.internalServerError, error: error })
    }
  }
}
export default ({ req, res }) => new ChatsController({ req, res })
