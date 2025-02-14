'use strict'

export async function up (queryInterface, Sequelize) {
  await queryInterface.createTable('clients', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
      field: 'user_id',
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    phoneNumber: {
      type: Sequelize.STRING,
      field: 'phone_number'
    },
    image: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    serverKey: {
      type: Sequelize.STRING,
      unique: true,
      field: 'server_key'
    },
    clientKey: {
      type: Sequelize.STRING,
      unique: true,
      field: 'client_key'
    },
    sdkKey: {
      type: Sequelize.STRING,
      unique: true,
      field: 'sdk_key'
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
      allowNull: false
    },
    createdBy: {
      type: Sequelize.UUID,
      field: 'created_by',
      references: { model: 'users', key: 'id' }
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at',
      allowNull: false
    },
    updatedBy: {
      type: Sequelize.UUID,
      field: 'updated_by',
      references: { model: 'users', key: 'id' }
    }
  })
}
export async function down (queryInterface, Sequelize) {
  await queryInterface.dropTable('clients')
}
