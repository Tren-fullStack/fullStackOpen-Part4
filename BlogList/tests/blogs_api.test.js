const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')

const app = require('../app')
const Blog = require('../models/blog')
const {testBlogs, sampleBlogPost, noUrl, noTitle, noUrlandTitle, blogsInDb} = require('./test_helper')
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

describe('blog posts are retrieved', async () => {
  test('the correct number of blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, testBlogs.length)
  })
})

describe('id field', async() => {
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

describe('addition of a new blog', async() => {
  test('blog list length increases when blog is added', async() => {
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

describe('when likes are missing', async() => {
  test('Likes become 0 if not given', async() => {
    const response = await api
      .post('/api/blogs')
      .send(sampleBlogPost[0])
      .expect('Content-Type', /application\/json/)
    
    const likes = response.body.likes
    assert.strictEqual(likes, 0)
  })
})

describe('when fields are missing', async() => {
  test('missing url gives 400 response code', async() => {
    const response = await api
      .post('/api/blogs')
      .send(noUrl[0])
      .expect(400)
  })
  test('missing title gives 400 response code', async() => {
    const response = await api
      .post('/api/blogs')
      .send(noTitle[0])
      .expect(400)
  })
  test('missing title and url gives 400 response code', async() => {
    const response = await api
      .post('/api/blogs')
      .send(noUrlandTitle[0])
      .expect(400)
  })
})

describe('removing a blog', async() => {
  test.only('delete request with valid id gives 204 status and removes blog', async() => {
    get = await api.get('/api/blogs')
    const blogToDel = get.body[0]
    console.log(blogToDel)

    const response = await api
      .delete(`/api/blogs/${blogToDel.id}`)
      .expect(204)
    
    const withBlogDel = await blogsInDb()
    assert.strictEqual(withBlogDel.length, testBlogs.length - 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})