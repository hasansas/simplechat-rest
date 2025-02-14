'use strict'

import path from 'path'
import crypto from 'crypto'

const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

export async function up (queryInterface, Sequelize) {
  // Get roles
  const _roles = []

  _roles.developer = { id: '', name: 'developer' }
  _roles.superAdmin = { id: '', name: 'superadmin' }
  _roles.admin = { id: '', name: 'admin' }
  _roles.client = { id: '', name: 'client' }

  _roles.developer.id = await getRoleId(queryInterface, _roles.developer.name)
  _roles.superAdmin.id = await getRoleId(queryInterface, _roles.superAdmin.name)
  _roles.admin.id = await getRoleId(queryInterface, _roles.admin.name)
  _roles.client.id = await getRoleId(queryInterface, _roles.client.name)

  // Create user
  const _salt = await bcrypt.genSalt(10)
  const _initialPassword = 'secret'
  const _users = [
    {
      id: uuidv4(),
      name: 'Developer',
      email: 'developer@dev.simplechat.com',
      password: await bcrypt.hash(_initialPassword, _salt),
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      name: 'Super Admin',
      email: 'superadmin@simplechat.com',
      password: await bcrypt.hash(_initialPassword, _salt),
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      name: 'Admin',
      email: 'admin@simplechat.com',
      password: await bcrypt.hash(_initialPassword, _salt),
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      name: 'John Doe',
      email: 'demo@simplechat.com',
      password: await bcrypt.hash(_initialPassword, _salt),
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]
  await queryInterface.bulkInsert('users', _users, {
    returning: true
  }).then(async (users) => {
    const _userRoles = [
      {
        user_id: users[0].id,
        role_id: _roles.developer.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: users[1].id,
        role_id: _roles.superAdmin.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: users[2].id,
        role_id: _roles.admin.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: users[3].id,
        role_id: _roles.client.id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
    await queryInterface.bulkInsert('users_roles', _userRoles, {
      returning: true
    })
      .then(async (userRoles) => {
        // Create client demo
        const { PREFIX_SERVER_KEY, PREFIX_CLIENT_KEY } = process.env
        const _serverKey = PREFIX_SERVER_KEY + crypto.randomBytes(16).toString('hex')
        const _clientKey = PREFIX_CLIENT_KEY + crypto.randomBytes(16).toString('hex')
        const _sdkKey = crypto.randomBytes(16).toString('hex')
        const _userClient = [
          {
            id: uuidv4(),
            user_id: userRoles[3].user_id,
            server_key: _serverKey,
            client_key: _clientKey,
            sdk_key: _sdkKey,
            created_at: new Date(),
            updated_at: new Date()
          }
        ]

        await queryInterface.bulkInsert('clients', _userClient, {})
      })
  })

  // log seeder
  const seeder = path.basename(__filename)
  await queryInterface.bulkInsert('SequalizeSeeders', [{ name: seeder }], {})
}
export async function down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', null, {})
}

async function getRoleId (queryInterface, roleId) {
  try {
    const _developerRole = await queryInterface.sequelize.query("SELECT id FROM roles WHERE name='" + roleId + "' limit 1")
    roleId = _developerRole[0][0].id
    return roleId
  } catch (error) {
    console.log(error)
  }
}
