'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chats_conversation', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      chatId: {
        type: Sequelize.UUID,
        field: 'chat_id',
        references: { model: 'chats', key: 'id' },
        onDelete: 'CASCADE'
      },
      message: {
        type: Sequelize.JSON
      },
      user: {
        type: Sequelize.STRING
      },
      refId: {
        type: Sequelize.STRING,
        field: 'ref_id'
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
    await queryInterface.dropTable('chats_conversation')
  }
}
