const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const {addUser, removeUser, getUser, getUsersInRoom} = require ('./users.js')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const router = require ('./router')

// Port 5000 used in local setup.
// When running in production mode, the process.env will get a port automatically
const PORT = process.env.PORT || 5000

io.on('connection', (socket) => {
  socket.on('join', ({name, room}, callBack) => {
    const {user, error} = addUser({id: socket.id, name, room})

    if(error) {
      return callBack(error)
    }

    socket.join(user.room)
  })

  socket.on('disconnect', () => {
    console.log('User left!')
  })
})

app.use(router)

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))