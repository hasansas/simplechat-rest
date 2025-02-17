/**
 * Chats Routes
 */

'use strict'

import ChatsController from './controller'

module.exports = function (app, router) {
  /**
    * Chat Auth
    */
  router.post('/v1/chats/auth',
    EXPRESS_VALIDATOR.body('sdkKey').not().isEmpty(),
    (req, res) => {
      ChatsController({ req, res }).auth()
    })

  /**
    * Send message
    */
  router.post('/v1/chats/message/send',
    EXPRESS_VALIDATOR.body('from').not().isEmpty(),
    EXPRESS_VALIDATOR.body('message').not().isEmpty(),
    (req, res) => {
      ChatsController({ req, res }).sendMessage()
    })
}
