describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const testUser = {
      name: 'Teemu Testaaja',
      username: 'Teemuntesti',
      password: 'Teemutestaa321'
    }

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
      cy.contains('log in').click()
      cy.get('#username').type('Teemuntesti')
      cy.get('#password').type('Teemutestaa321')
      cy.get('#loginbtn').click()
    })

    it('A blog can be created', function() {
      cy.contains('Add blog').click()
      cy.get('#titleField').type('Teemun testikirja')
      cy.get('#authorField').type('Teemu Testaaja')
      cy.get('#urlField').type('https://www.teemuntestikirja.fi/testi')
      cy.get('#submitbtn').click()
      cy.get('.note').contains('A new blog has been added: Teemun testikirja by Teemu Testaaja')
    })
  })

})