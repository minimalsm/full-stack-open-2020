import { cyan } from "color-name"

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Joshua',
      username: 'joshua',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to see posts')
  })

  describe('Login', function() {
    it('suceeds with the correct credentials', function() {
      cy.get('#username').type('joshua')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Joshua logged in')
    })

    it('fails with the invalid credentials', function() {
      cy.get('#username').type('joshua')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })


  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'joshua', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('Add a blog').click()
      cy.get('#title-form').type('Cypress test title')
      cy.get('#author-form').type('Cypress Author')
      cy.get('#url-form').type('www.google.com')

      cy.contains('create it').click()
      cy.get('.error').contains('Created')
      cy.get('.blog-title').contains('Cypress test title')
      
      cy.contains('See Details').click()
      cy.get('.blog-info').contains('Url: www.google.com')
    })
  })

})