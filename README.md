# Node.Js RESTful API
> Modular RESTful API with Node.Js, Express, Redis, PostgreSQL, Sequelize, Socket.IO, and Javascript Standard Style 

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com)
[![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)
[![PosgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)](https://sequelize.org)
[![SOcket.IO](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io)


## Overview
1. Uses Node.js v18
2. Redis v7.0
3. Written using ES6
4. Uses npm for package dependency management
5. Uses JavaScript Standard Style
6. Uses sequelize and sequelize-cli as ORM and data migration tool
7. Filename convention - camelCase should never be used. Uses snake_case for file.


## Development Environment Setup
1. Make sure you have nvm, node v14.16.1 or LTS version of node and redis-server installed on your server
2. Install PostgreSql >= v9


## Quick Start
1. Clone the repository
2. Install the dependencies `npm install`
3. Copy `.env.example` `.env` and populate it with the correct credentials and settings
4. Create Databases `npm run db:create`
5. Run database migration `npm run db:migrate`
6. Run seeder `npm run db:seeds`
7. Run `npx sequelize-cli db:seed --seed 004-email-template.js` if no data inserted on `email_templates` table
8. Run the application in development mode with `npm run dev`


## Deploy
#### Process Manager (PM2)
1. `sudo npm install pm2 -g` - Install PM2
2. `pm2 startup` - Auto Start pm2 on boot
3. `npm run pm2:start` - Start an app
4. `pm2 save` - Freeze a process list for automatic respawn

#### Enable Port
1. `sudo ufw status` - Check ufw firewall
2. `sudo ufw allow {port}` - Open port

## Tech stack
* [Node.Js](https://nodejs.org/) - Server Environment
* [Express](https://expressjs.com/) - Node Framweork
* [Nodemon](https://nodemon.io/) - Use for development file reload.
* [PostgreSQL](https://www.postgresql.org/) - Relational Database.
* [pg-hstore](https://www.npmjs.com/package/pg-hstore) - A node package for serializing and deserializing JSON data to hstore format
* [pg](https://www.npmjs.com/package/pg) - JavaScript and optional native libpq bindings
* [Sequalize](https://sequelize.org) - promise-based ORM for Node.js
* [Json Webtoken](https://github.com/auth0/node-jsonwebtoken) - An implementation of JSON Web Tokens.
* [Redis](https://redis.io/) - In-memory data store.
* [Socket.IO](https://socket.io/) - Library that enables low-latency, bidirectional and event-based communication between a client and a server


## JavaScript Standard Style
> [JavaScript Standard Style](https://standardjs.com) is a style guide with a linter and an automatic code fixer

### The Rules

* **2 spaces** – for indentation
* **Single quotes for strings** – except to avoid escaping
* **No unused variables** – this one catches tons of bugs!
* **No semicolons** 
* **Space after keywords** `if (condition) { ... }`
* **Space after function name** `function name (arg) { ... }`
* **Always use === instead of ==** – but `obj == null` is allowed to check `null || undefined`
* **Always handle the node.js err function parameter**
* And [more](https://standardjs.com/rules.html)
