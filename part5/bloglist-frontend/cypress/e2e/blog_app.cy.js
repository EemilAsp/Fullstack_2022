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

})