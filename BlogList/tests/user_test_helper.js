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

const smolUserN = {
  username: 'sn',
  name: 'Phil Collines',
  password: 'MooveIt'
}

const smolPass = {
  username: 'gWibbly',
  name: 'Garry Wibbly',
  password: 'gW'
}

const notUnique = {
  username: 'jRogan',
  name: 'Paul Rogan',
  password: 'TimeMovesForever'
}

const usersInDb = async () => {
  const blogs = await User.find({})
  return blogs.map(user => user.toJSON())
}

module.exports = { testUsers, alienUser, smolUserN, smolPass, notUnique, usersInDb }