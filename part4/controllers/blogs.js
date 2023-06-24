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

blogRouter.delete('/:id', async (request, response) =>{
    try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    }catch{
      response.status(500).json({error: 'An error has ocurred while deleting'})
    }
})




module.exports = blogRouter