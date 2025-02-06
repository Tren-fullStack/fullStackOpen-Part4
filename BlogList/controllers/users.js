const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const { info } = require('../utils/logger')

userRouter.get('/', async (request, response) => {
    const result = await User.find({})
    info(`length of result: ${result.length}`)
    response.json(result)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  
  const passHash = await bcrypt.hash(password, 10)

  const user = new User ({
    username,
    name,
    passHash,
  })

  const savedUser = await user.save()
  response.status(201, 'created new user').json(savedUser)
})

module.exports = userRouter