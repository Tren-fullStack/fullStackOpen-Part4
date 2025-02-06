const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')

const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const { testUsers, alienUser, smolUserN, smolPass, notUnique, usersInDb } = require('./user_test_helper')

describe('user POST', async () => {
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
  
  test('user saves to db and returns status 201', async() => {
    await api
      .post('/api/users')
      .send(alienUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
  test('username less than 3 chars, user not created', async() => {
    await api
    .post('/api/users')
    .send(smolUserN)
    .expect(401)
  const dbLen = await usersInDb()
  assert.strictEqual(dbLen.length, testUsers.length)
  })
  test('password less than 3 chars, user not created', async() => {
    await api
    .post('/api/users')
    .send(smolPass)
    .expect(401)
  const dbLen = await usersInDb()
  assert.strictEqual(dbLen.length, testUsers.length)
  })
  test('username not unique, user not created', async() => {
     await api
    .post('/api/users')
    .send(notUnique)
    .expect(400)
  const dbLen = await usersInDb()
  assert.strictEqual(dbLen.length, testUsers.length)
   })
})

after(async () => {
  await mongoose.connection.close()
})
