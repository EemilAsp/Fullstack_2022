
const testUser = {
  name: 'Teemu Testaaja',
  username: 'Teemuntesti',
  password: 'Teemutestaa321'
}

const testUser2 = {
  name: 'Teemu Testaajanpoika',
  username: 'Teemuntesti2',
  password: 'Teemutestaa4321'
}

const testBlog = {
  title: 'Teemun testikirja part1',
  author: 'Teemu Testaaja',
  url: 'https://www.teemuntestikirja.fi/part1',
  likes: 2
}

const testBlog2 = {
  title: 'Teemun testikirja part2',
  author: 'Teemu Testaaja',
  url: 'https://www.teemuntestikirja.fi/part2',
  likes: 3
}

const testBlog3 = {
  title: 'Teemun testikirja part3',
  author: 'Teemu Testaaja',
  url: 'https://www.teemuntestikirja.fi/part3',
  likes: 7
}

describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/',testUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('Teemuntesti')
      cy.get('#password').type('Teemutestaa321')
      cy.get('#loginbtn').click()
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#loginbtn').click()
      cy.get('.error').contains('Invalid credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: testUser.username, password: testUser.password })
    })

    it('A blog can be created', function() {
      cy.contains('Add blog').click()
      cy.get('#titleField').type(testBlog.title)
      cy.get('#authorField').type(testBlog.author)
      cy.get('#urlField').type(testBlog.url)
      cy.get('#submitbtn').click()
      cy.get('.note').contains('A new blog has been added: Teemun testikirja part1 by Teemu Testaaja')
    })

    it('A blog can be liked', function() {
      cy.createBlog({ title: testBlog.title, author: testBlog.author, url: testBlog.url })
      cy.get('#showbtn').click()
      cy.get('#likebtn').click()
      cy.contains('1')
    })

    it('A blog can be removed', function() {
      cy.createBlog({ title: testBlog.title, author: testBlog.author, url: testBlog.url })
      cy.get('#showbtn').click()
      cy.get('#removebtn').click()
      cy.on('window:confirm', () => {return(true)})
    })

    it('A blog cannot be removed if not blog creator', function() {
      cy.createBlog({ title: testBlog.title, author: testBlog.author, url: testBlog.url })
      cy.get('#logoutbtn').click()
      cy.request('POST', 'http://localhost:3003/api/users/',testUser2)
      cy.login({ username: testUser2.username, password: testUser2.password })
      cy.get('#showbtn').click()
      cy.contains('#removebtn').should('not.exist')
    })
  })

  describe('Blogs are ordered correctly', function() {
    beforeEach(function() {
      cy.login({ username: testUser.username, password: testUser.password })
      cy.createBlog({ title: testBlog.title, author: testBlog.author, url: testBlog.url, likes: testBlog.likes })
      cy.createBlog({ title: testBlog2.title, author: testBlog2.author, url: testBlog2.url, likes: testBlog2.likes })
      cy.createBlog({ title: testBlog3.title, author: testBlog3.author, url: testBlog3.url, likes: testBlog3.likes })
    })
    it('blogs sorted correctly', function() {
      cy.get('.blog').each((blog, index) => {
        cy.wrap(blog).find('#showbtn').click()
        if(index === 0){
          cy.wrap(blog).find('#likebtn').click()
          cy.wait(1500)
          cy.wrap(blog).find('#likebtn').click()
          cy.wait(1500)
        }else if(index === 2){
          cy.wrap(blog).find('#likebtn').click()
          cy.wait(1500)
          cy.wrap(blog).find('#likebtn').click()
          cy.wait(1500)
          cy.wrap(blog).find('#likebtn').click()
          cy.wait(1500)
          cy.wrap(blog).find('#likebtn').click()
        }
      })
      cy.get('.blog').eq(0).should('contain', 'https://www.teemuntestikirja.fi/part3')
      cy.get('.blog').eq(1).should('contain', 'https://www.teemuntestikirja.fi/part1')
      cy.get('.blog').eq(2).should('contain', 'https://www.teemuntestikirja.fi/part2')
    })
  })

})