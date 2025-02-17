/**
 * Chats Conversation Model
 */

'use strict'

module.exports = (sequelize, DataTypes) => {
  const ChatsConversation = sequelize.define(
    'chatsConversation',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      chatId: {
        type: DataTypes.UUID,
        field: 'chat_id',
        references: { model: 'chats', key: 'id' },
        onDelete: 'CASCADE'
      },
      message: {
        type: DataTypes.JSON
      },
      user: {
        type: DataTypes.STRING
      },
      refId: {
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'chats_conversation',
      freezeTableName: true,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
      scopes: {
        // ..
      }
    }
  )
  return ChatsConversation
}
