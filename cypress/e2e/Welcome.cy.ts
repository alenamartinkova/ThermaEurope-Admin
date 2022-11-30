describe('welcome page', () => {
  it('checks welcome page content', () => {
    cy.visit('/')
    cy.get('h1').contains('Welcome')
  })
})
