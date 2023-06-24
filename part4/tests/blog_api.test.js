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
        expect(res.id).toBeDefined() // By default the id is written as _id
        expect(res._id).toBeUndefined() // so the test will not go through if these two will be swapped
    })
})


describe('A blog can be added to DB', () => {
    test('Valid blog json can be added to db', async () => {
        newBlog = helper.testBlog

        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

        const endBlog = await helper.blogsInDb()
        expect(endBlog).toHaveLength(helper.initialBlogs.length +1)

        const titles = endBlog.map(i => i.title)
        expect(titles).toContain(
            'Testauksen alkeet'
        )
    })
})

describe('If no likes, add default 0', () =>{
    test('Test the amount of likes', async () => {
        newBlog = helper.testBlog
        // not really needed since default is set to 0 in blog.js
        //if(newBlog.likes === undefined){ 
        //    newBlog.likes = 0;
        //}
        const res = await api
                            .post('/api/blogs')
                            .send(newBlog)
                            .expect(201)
        expect(res.body.likes).toEqual(0)
    })
})

describe('Test title and URL', () =>{
    test('Test if title or url missing', async () => {
        newBlog = {
            author: "Testi Teemu",
            likes: 5
        }
        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)  
    })
})

describe('Delete blog from DB', () => {
    test('Test deleting a blog from db', async () => {
        const blogsAtStart = await helper.blogsInDb()
        console.log(blogsAtStart)
        const blogToDelete =  blogsAtStart[0]
        console.log(blogToDelete.id)
        await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)
        
        blogsAfterDel = await helper.blogsInDb()
        expect(blogsAfterDel).toHaveLength(helper.initialBlogs.length -1)

        const contents = blogsAfterDel.map(i => i.title)
        expect(contents).not.toContain(blogToDelete.title)

    })
})


afterAll(async () => {
    await mongoose.connection.close()
  })


