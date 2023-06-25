const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const App = require('../App')
const api = supertest(App)

const User = require('../models/user')
const helper = require('./api_test_helper')


describe('Testing related to db user', () =>{

    beforeEach(async () =>{
        await User.deleteMany({})

        const hashedPassWord = await bcrypt.hash('sekret', 10)
        const user = new User({username: 'root', hashedPassWord})
        await user.save()

        const hashedPassWord2 = await bcrypt.hash('sekrets', 10)
        const user2 = new User({username: 'Teemu Testaaja', hashedPassWord2})
        await user2.save()
        
    })

    test('Creating a new user with new name', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'tTestaaja',
            name: "Teemu Testaaja",
            password: 'testaaja123'
        }

        await api
                .post("/api/users")
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(usersAtStart.length +1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test("Testing that the username has to be unique", async () => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'Salaisuus'
        }

        const res = await api
                        .post("/api/users")
                        .send(newUser)
                        .expect(400)
                        .expect('Content-Type', /application\/json/)

        console.log(res.body.error)

        expect(res.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtStart).toHaveLength(usersAtEnd.length)
    })

    test("Testing that user with invalid username & password cannot be created", async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'mr',
            name: 'teemu',
            password: 'xx'
        }
        const res = await api
                        .post("/api/users")
                        .send(newUser)
                        .expect(400)
                        .expect('Content-Type', /application\/json/)

        console.log(res.body.error)

        expect(res.body.error).toContain('Username and password must be longer than 2 characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtStart).toHaveLength(usersAtEnd.length)
    })

    test("Testing that user with invalid username & password cannot be created", async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            name: 'teemu',
            password: 'xxxx'
        }
        const res = await api
                        .post("/api/users")
                        .send(newUser)
                        .expect(400)
                        .expect('Content-Type', /application\/json/)

        console.log(res.body.error)

        expect(res.body.error).toContain('Username and password must be defined')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtStart).toHaveLength(usersAtEnd.length)

    })

})


afterAll(async () => {
    await mongoose.connection.close()
  })