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
    try{
    const blog = await Blog.findById(request.params.id)
    const user = await request.user
    console.log(user)
    console.log(blog)
    if(blog.user.toString() === user._id.toString()){ // test if blog user id and request user id match
      await Blog.findByIdAndRemove(request.params.id) // delete if matches
      response.status(200).end("The blog has been succesfully deleted from the database")
    }
    }catch{
      response.status(401).json({error: 'Only Blog writer can delete blog for database'})
    }
})

blogRouter.put('/:id', middleware.userExtractor, async (request, response) =>{
    try{
    const blog = await request.body
    const user = await request.user
    const oldBlog = await Blog.findById(request.params.id)

    console.log("Uusi blogi: ", blog)
    console.log("Vanha blogi ID:n perusteella: ",oldBlog)
    console.log("Käyttäjä", user)

    if(oldBlog.user.toString() === user._id.toString()){ // test if blog user id and request user id match

    const updatedBlog = { // Edit blog it editor and blog's user id matches
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: user._id,
    }

    await Blog.findByIdAndUpdate(request.params.id, updatedBlog,
      { new: true})

    response.status(200).json(updatedBlog)
    }
    }catch{
      response.status(401).json({error: 'Only Blog writer can edit blog inside the database'})
    }
})




module.exports = blogRouter