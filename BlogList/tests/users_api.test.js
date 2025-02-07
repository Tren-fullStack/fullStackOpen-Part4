const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const { alienUser, smolUserN, smolPass, notUnique, usersInDb } = require('./user_test_helper')

describe('user POST', async () => {
  beforeEach(async () => {
    console.log('clearing db...')
    await User.deleteMany({})
    console.log('cleared db')
    
    const passHash = await bcrypt.hash('DMT?', 10)
    const user = new User({ username: 'JRogan', name: 'Joe Rogan', passHash, })

    await user.save()
    
    console.log('re-initializing testing db completed')
  })
   // need to figure out whats wrong it does a duplicate key error collection
  test.only('user saves to db and returns status 201', async() => {
    await api
      .post('/api/users')
      .send(alienUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const dbLen = await usersInDb()
    assert.strictEqual(dbLen.length, 2)
  })
  test('username less than 3 chars, user not created', async() => {
    await api
    .post('/api/users')
    .send(smolUserN)
    .expect(401)
  const dbLen = await usersInDb()
  assert.strictEqual(dbLen.length, 1)
  })
  test('password less than 3 chars, user not created', async() => {
    await api
    .post('/api/users')
    .send(smolPass)
    .expect(401)
  const dbLen = await usersInDb()
  assert.strictEqual(dbLen.length, 1)
  })
  test('username not unique, user not created', async() => {
  const result = await api
    .post('/api/users')
    .send(notUnique)
    .expect(400)
  const dbLen = await usersInDb()

  assert.strictEqual(dbLen.length, 1)
  assert(result.body.error.includes('expected `username` to be unique'))
   })
})

after(async () => {
  await mongoose.connection.close()
})
