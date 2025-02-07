const User = require('../models/user')

const alienUser = {
    username: 'aLeeNen',
    name: 'Martian Man',
    passHash: 'threeBlackHole'
}

const smolUserN = {
  username: 'sn',
  name: 'Phil Collines',
  passHash:'MooveIt'
}

const smolPass = {
  username: 'gWibbly',
  name: 'Garry Wibbly',
  passHash:'gW'
}

const notUnique = {
  username: 'jRogan',
  name: 'Paul Rogan',
  passHash:'TimeMovesForever'
}

const usersInDb = async () => {
  const blogs = await User.find({})
  return blogs.map(user => user.toJSON())
}

module.exports = { alienUser, smolUserN, smolPass, notUnique, usersInDb }