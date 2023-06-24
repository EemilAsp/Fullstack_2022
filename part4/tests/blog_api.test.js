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


