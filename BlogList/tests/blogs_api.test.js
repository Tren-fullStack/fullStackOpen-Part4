const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')

const app = require('../app')
const Blog = require('../models/blog')
const {testBlogs} = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  console.log('clearing db...')
  await Blog.deleteMany({})
  console.log('cleared db')

  //waits for all the promises to fufilled (blogs to be saved) before running tests
  const blogObjects = testBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  console.log('re-initializing testing db completed')
})

describe('testing GET', async () => {
  test.only('3 blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, 2)
  })

  after(async () => {
    await mongoose.connection.close()
  }) 
})

describe('testing id', async() => {
  test.only('')
})