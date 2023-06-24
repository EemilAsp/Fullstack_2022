const mongoose = require('mongoose')
const supertest = require('supertest')
const App = require('../App')

const api = supertest(App)

const Blog = require('../models/blog')
const helper = require('./api_test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})
  
    let BlogObject = new Blog(helper.initialBlogs[0])
    await BlogObject.save()
  
    BlogObject = new Blog(helper.initialBlogs[1])
    await BlogObject.save()
  })


describe('Return all blogs', () =>{ // testing that db returns all the json objects 
    test('All elements from DB are returned', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(helper.initialBlogs.length)
    })
})

describe('Identifier named as id', () => {
    test('test that saved objects have id', async () => {
        const res = (await api.get('/api/blogs')).body[0]
        expect(res._id).toBeDefined() // By default the id is written as _id
        expect(res.id).toBeUndefined() // so the test will not go through if these two will be swapped
    })
})


afterAll(async () => {
    await mongoose.connection.close()
  })

