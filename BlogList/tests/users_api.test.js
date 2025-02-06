const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')

const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const { testUsers, alienUser, usersInDb } = require('./user_test_helper')

beforeEach(async () => {
  console.log('clearing db...')
  await User.deleteMany({})
  console.log('cleared db')
  
  //waits for all the promises to fufilled (blogs to be saved) before running tests
  const userObjects = testUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
  
  console.log('re-initializing testing db completed')
})

describe('user POST', async () => {
  test('user saves to db and returns status 201', async() => {
    await api
      .post('/api/users')
      .send(alienUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})
