const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)        
  })

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const blog = request.body
  const user = await request.user

  console.log(user)
  if(user === null){
    return response.status(401).json({error: 'Invalid token'})
  }
  
  if(blog.title === undefined || blog.url === undefined){
    response.status(400).end()
  }else{
    const newBlog = new Blog({
      title: blog.title,
      author: blog.title,
      url: blog.url,
      likes: blog.likes,
      user: user._id
    })


    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) =>{
    //try{
    const blog = await Blog.findById(request.params.id)
    console.log("blog", blog.user)
    console.log("params id", request.params.id)
    const user = await request.user
    console.log(user._id.toString())
    console.log(blog.user._id.toString())
    if(blog.user.toString() === user._id.toString()){ // test if blog user id and request user id match
      await Blog.findByIdAndRemove(request.params.id) // delete if matches
      response.status(204).end()
    }
    //}catch{
      response.status(401).json({error: 'Only Blog writer can delete blog for database'})
    //}
})

blogRouter.put('/:id', middleware.userExtractor, async (request, response) =>{
    const blog = request.body
    const user = request.user

    const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: user._id,
    }

    await Blog.findByIdAndUpdate(request.params.id, updatedBlog,
      { new: true})
    
    response.status(200).json(updatedBlog)
})




module.exports = blogRouter