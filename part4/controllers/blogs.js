const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
   const blogs = await Blog
                          .find({})
  response.json(blogs)        
  })

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(blog.title === undefined || blog.url === undefined){
    response.status(400).end()
  }else{
    result = await blog
              .save()
    response.status(201).json(result)
    
  }
})


module.exports = blogRouter