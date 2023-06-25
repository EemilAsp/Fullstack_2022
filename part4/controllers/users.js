const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    console.log(username, name, password)

    if(username === undefined || password === undefined){
        return(
        response.status(400).json({error: 'Username and password must be defined'})
        )
    }

    const uniqueUser = await User.findOne({username}) // if user with same name found return error 400
    if(uniqueUser){
        return(
            response.status(400).json({error: 'expected `username` to be unique'})
        )
    }else if (username.length < 3 || password.length <3){
        return(
        response.status(400).json({error: 'Username and password must be longer than 2 characters'})
        )
    }

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