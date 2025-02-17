/**
 * chats Model
 */

'use strict'

module.exports = (sequelize, DataTypes) => {
  const Chats = sequelize.define(
    'chats',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      clientId: {
        type: DataTypes.UUID,
        references: { model: 'chats', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      clientUserId: {
        type: DataTypes.STRING
      },
      clientUserName: {
        type: DataTypes.STRING
      },
      asignedTo: {
        type: DataTypes.UUID
      },
      lastMessage: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'chats',
      freezeTableName: true,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
      },
      scopes: {
        // ..
      }
    }
  )
  return Chats
}
