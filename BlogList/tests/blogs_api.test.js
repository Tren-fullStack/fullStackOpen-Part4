const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')

const app = require('../app')
const Blog = require('../models/blog')
const {testBlogs, sampleBlogPost, blogsInDb} = require('./test_helper')
const api = supertest(app)

//reset test db, so tests are always the same
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
  test('3 blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, testBlogs.length)
  })
})

describe('testing id', async() => {
  test('blog identifier is called id', async () => {
    const response = await blogsInDb()
    let idKey = false
    for (i=0; i<response.length; i++) {
      if (Object.keys(response[i]).find(key => key === 'id')) {idKey = true}
      else {
        idKey = false
        break
      }
    }
    assert.strictEqual(idKey, true)
  })
})

describe('testing POST', async() => {
  test('new blog post is created', async() => {
    await api
     .post('/api/blogs')
     .send(sampleBlogPost[0])
     .expect(201)
     .expect('Content-Type', /application\/json/)
    
    const withBlogAdded = await blogsInDb()
    console.log('Added: ',withBlogAdded)
    assert.strictEqual(withBlogAdded.length, testBlogs.length + 1)

    const addedTitle = withBlogAdded.find(t => t.title === 'Adore me')
    assert.deepStrictEqual(addedTitle.title, sampleBlogPost[0].title)
  })
})

describe('testing default Likes', async() => {
  test('Likes become 0 if not given', async() => {
    const response = await api
      .post('/api/blogs')
      .send(sampleBlogPost[0])
      .expect('Content-Type', /application\/json/)
    
    const likes = response.body.likes
    assert.strictEqual(likes, 0)
  })
})

after(async () => {
  await mongoose.connection.close()
})