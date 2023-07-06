
const testUser = {
  name: 'Teemu Testaaja',
  username: 'Teemuntesti',
  password: 'Teemutestaa321'
}

const testBlog = {
  title: 'Teemun testikirja',
  author: 'Teemu Testaaja',
  url: 'https://www.teemuntestikirja.fi/testi'
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
      cy.get('.note').contains('A new blog has been added: Teemun testikirja by Teemu Testaaja')
    })

    it('A blog can be liked', function() {
      cy.createBlog({ title: testBlog.title, author: testBlog.author, url: testBlog.url })
      cy.get('#showbtn').click()
      cy.get('#likebtn').click()
      cy.contains('1')
    })

  })

})