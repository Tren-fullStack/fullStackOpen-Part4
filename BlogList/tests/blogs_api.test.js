const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, after, describe } = require('node:test')
const assert = require('node:assert')

const app = require('../app')

const api = supertest(app)

describe('testing GET', async () => {
  test.only('3 blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body, 3)
  })

  after(async () => {
    await mongoose.connection.close()
  }) 
})


describe('number of blogs in database', async () => {

    
  after(async () => {
    await mongoose.connection.close()
  }) 
})
