const User = require('../models/user')

const testUsers = [
    {
      username: 'sDorssers',
      name: 'Stephen Dorssers',
      password: 'boDiddly'
    },
    {
      username: 'jRogan',
      name: 'Joe Rogan',
      password: 'DMT?'
    }
]

const alienUser = {
    username: 'aLeeNen',
    name: 'Martian Man',
    password: 'threeDimBlackHole'
}

const usersInDb = async () => {
  const blogs = await User.find({})
  return blogs.map(user => user.toJSON())
}

module.exports = { testUsers, alienUser, usersInDb }