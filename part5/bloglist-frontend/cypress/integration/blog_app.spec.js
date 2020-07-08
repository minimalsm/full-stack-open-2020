describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'https://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to see posts')
  })
})