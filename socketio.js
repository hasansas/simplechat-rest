/**
 * Socket.IO
 */

'use strict'

// import eiows from 'eiows'

export default function (httpServer) {
  const origin = ENV.ALLOWED_ORIGIN || '*'
  const corsOrigins = origin.split(',')
  const allowedOrigin = corsOrigins.length > 1 ? corsOrigins : corsOrigins[0]

  global.IO = require('socket.io')(httpServer, {
    cors: {
      origin: allowedOrigin
    },
    perMessageDeflate: {
      threshold: 32768
    }
    // wsEngine: eiows.Server,
  })

  IO.on('connection', (socket) => {
    const _clientId = socket.id

    IO.to(_clientId).emit('connected', _clientId)

    socket.on('connected', function ({ clientUser, page = null }) {
      socket.data.clientUser = clientUser
      socket.data.page = page
      // console.log(`IO connected(${socket.data.clientUser})`)
    })

    socket.on('disconnect', () => {
      // const clientUser = socket.data.clientUser
      // console.log(`IO disconnect(${clientUser})`)
    })

    // TODO: add onAny for development mode
    socket.onAny((event, ...args) => {
      // console.log(event, args)
    })
  })

  // Discard the initial HTTP request
  IO.engine.on('connection', (rawSocket) => {
    rawSocket.request = null
  })
}
