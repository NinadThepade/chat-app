const users = []

const addUser = ({id, name, room}) => {
  name = name.trim().tolowercase()
  room = room.trim().tolowercase()

  const existingUser = users.find((user) => user.name === name && user.room === room);

  if(existingUser) {
    return {error: 'Username is already taken'}
  }

  const newUser = {id, name, user}

  users.push(newUser);

  return { newUser }
}

const removeUser = (id) => {
  const existingUser = users.findIndex((user) => user.id === id);

  if(existingUser !== -1) {
    return users.splice(existingUser, 1)[0]
  } else {
    return {error: 'No such user'}
  }

}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = {addUser, removeUser, getUser, getUsersInRoom};