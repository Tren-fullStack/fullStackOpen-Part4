loginRouter = require('express').Router()
const jsonToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  console.log(`username: ${username}, password: ${password}`)
  // find user corresponding to requested username
  const user = await User.findOne({ username })
  console.log('user: ', user)
  // bcrypt compares password to db saved hash
  const passwordCorrect = user === null
  ? false
  : await bcrypt.compare(password, user.passHash)
  // if username or password isnt correct
  if (!user || !passwordCorrect){
      return response.status(401).json({ error: 'invalid username or password'})
  }
  else {
    const forToken = {
      username: user.username,
      id: user._id,
    }
   // takes a string from .env and uses it to sign a token that only that user can use
    const token = jsonToken.sign(forToken, config.SECRET)
  
    response.status(200)
      .send({ token, username: user.username, name: user.name })
  }
})

module.exports = loginRouter