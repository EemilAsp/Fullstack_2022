const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)        
  })

blogRouter.post('/', async (request, response) => {
  const blog = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({error: 'Invalid token'})
  }
  
  const user = await User.findById(decodedToken.id)
  console.log(user)
  
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

blogRouter.delete('/:id', async (request, response) =>{
    try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    }catch{
      response.status(500).json({error: 'An error has ocurred while deleting'})
    }
})

blogRouter.put('/:id', async (request, response) =>{
    const blog = request.body
    const user = await User.findOne({})

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