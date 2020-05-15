const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const cors = require('cors')

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
    const {newUser, error} = addUser({id: socket.id, name, room})

    if(error) {
      return callBack(error)
    }

    // Initial messaging for the new user and the broadcast message for other members of room
    socket.emit('message', {user: 'admin', text: `${newUser.name} welcome to the room ${newUser.room}`})
    socket.broadcast.to(newUser.room).emit('message', {user: 'admin', text: `${newUser.name} joined the room`})

    socket.join(newUser.room)

    io.to(newUser.room).emit('roomData', {room: newUser.room, users: getUsersInRoom(newUser.room)})
    callBack()
  })

  socket.on('sendMessage', (message, callBack) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', {user: user.name, text: message});
    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

    callBack();
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if(user) {
      io.to(user.room).emit('message', {user: 'admin', text: `${user.name} left`});
    }
  })
})

app.use(router)
app.use(cors)

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))