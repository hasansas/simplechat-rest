'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chats', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      clientId: {
        type: Sequelize.UUID,
        references: { model: 'clients', key: 'id' },
        onDelete: 'CASCADE',
        field: 'client_id',
        allowNull: false
      },
      clientUserId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'client_user_id'
      },
      clientUserName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'client_user_name'
      },
      asignedTo: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references: { model: 'users', key: 'id' },
        field: 'asigned_to'
      },
      lastMessage: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_message'
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'open'
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('chats')
  }
}
