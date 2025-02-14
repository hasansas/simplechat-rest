/**
 * Client Notificaton
 */

import axios from 'axios'
import crypto from 'crypto'

class ClientNotificaton {
  constructor ({ messageId, ack }) {
    this.clientsNotificationsModel = DB.clientsNotifications
    this.messageId = messageId
    this.ack = ack
  }

  async send () {
    try {
      const [getMessage] = await DB.sequelize.query(
        'SELECT ' +
        'clients.id as client_id, ' +
        'clients.server_key, ' +
        'clients_configurations.value as notification_url, ' +
        'messages.id, ' +
        'messages.from, ' +
        'messages.to, ' +
        'messages.ref_id, ' +
        'messages.chat_group_id, ' +
        'messages.ref_user ' +
        'FROM clients ' +
        'LEFT JOIN clients_configurations ON clients_configurations.client_id = clients.id ' +
        'LEFT JOIN messages ON messages.client_id = clients.id ' +
        "WHERE clients_configurations.name='notification_url'" +
        `AND messages.message_id='${this.messageId}'`
      )
      const _message = getMessage.length > 0 ? getMessage[0] : null

      let _request
      if (_message != null) {
        if (_message.notification_url !== '') {
          // create signature
          const hash = crypto.createHash('sha512')
          const privateKey = _message.server_key
          const dataHash = hash.update(this.messageId + privateKey, 'utf-8')
          const signature = dataHash.digest('hex')

          // send notification
          _request = {
            id: _message.id,
            message_id: this.messageId,
            ack: this.ack,
            from: _message.from,
            to: _message.to,
            ref_id: _message.ref_id,
            chat_group_id: _message.chat_group_id,
            ref_user: _message.ref_user,
            signature_key: signature
          }

          let status = 'pending'
          await axios.post(_message.notification_url, _request)
            .then((_) => {
              status = 'success'
            })
            .catch((_) => {
              status = 'failed'
            })

          // save to clients notification
          const _notificationData = {
            clientId: _message.client_id,
            messageId: this.messageId,
            request: _request,
            notificationUrl: _message.notification_url,
            status: status
          }
          this.clientsNotificationsModel.create(_notificationData)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default ({ messageId, ack }) => new ClientNotificaton({ messageId, ack })
