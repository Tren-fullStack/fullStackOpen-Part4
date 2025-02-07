const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const { info } = require('../utils/logger')

userRouter.get('/', async (request, response) => {
    const user = await User.find({}).populate('blogs','-user')

    response.json(user)
})

userRouter.post('/', async (request, response) => {
  let { username, name, passHash, } = request.body

  info('username length', username.length)
  info('password length', passHash.length)

  // check if username and password are valid length
  if (username.length < 3 || passHash.length < 3) {
    response.status(401).send('username and password must be 3 or more charaters')
  }
  else {
    // encrypts password
    passHash = await bcrypt.hash(passHash, 10)

  const user = new User ({
    username,
    name,
    passHash,
  })

  const savedUser = await user.save()
  response.status(201, 'created new user').json(savedUser)
  }
})

module.exports = userRouter