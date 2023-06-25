const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const uniqueUser = await User.findOne({username}) // if user with same name found return error 400
    if(uniqueUser){
        return(
            response.status(400).json({error: 'expected `username` to be unique'})
        )
    } // else add to db
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  })
  
  usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
  })
  
  module.exports = usersRouter