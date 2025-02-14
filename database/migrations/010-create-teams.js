'use strict'

export async function up (queryInterface, Sequelize) {
  await queryInterface.createTable('teams', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    userId: {
      type: Sequelize.UUID,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
      field: 'user_id',
      allowNull: false
    },
    clientId: {
      type: Sequelize.UUID,
      references: { model: 'clients', key: 'id' },
      onDelete: 'CASCADE',
      field: 'client_id',
      allowNull: false
    },
    isOwner: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      field: 'is_owner'
    },
    role: {
      type: Sequelize.STRING
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
    },
    deletedAt: {
      type: Sequelize.DATE,
      field: 'deleted_at'
    },
    deletedBy: {
      type: Sequelize.UUID,
      field: 'deleted_by',
      references: { model: 'users', key: 'id' }
    }
  })
}
export async function down (queryInterface, Sequelize) {
  await queryInterface.dropTable('teams')
}
