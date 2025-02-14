/**
 * Settings Model
 */

'use strict'

module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define(
    'settings',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      value: {
        type: DataTypes.STRING
      },
      createdBy: {
        type: DataTypes.UUID
      },
      updatedBy: {
        type: DataTypes.UUID
      },
      deletedAt: {
        type: DataTypes.UUID
      },
      deletedBy: {
        type: DataTypes.UUID
      }
    },
    {
      tableName: 'settings',
      freezeTableName: true,
      defaultScope: {
        attributes: { exclude: ['createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy'] }
      },
      scopes: {
        // ..
      }
    }
  )
  Settings.addScope('actor', {
    attributes: [['created_by', 'id']]
  })

  return Settings
}
