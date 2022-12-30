describe('security_password', () => {
  const url = '/'
  const getApp = () => cy.get('#app')

  before(() => {
    cy.fixture('login.json').then(login => {
      this.login = login
    })
  })

  it('test display form', () => {
    cy.login(this.login.email, this.login.password)

    cy.get('[data-testid=account-menu]').should('exist')
    cy.get('[data-testid=account-menu]').find('.account-menu-trigger').click()
    cy.get('[data-testid=account-menu]').find('.content').should('exist')

    cy.get('[data-testid=account-menu]').find('[data-testid=security]').should('exist')
    cy.get('[data-testid=account-menu]').find('[data-testid=security]').click()

    cy.get('[data-testid=security_password_block]').should('exist')
  })
})
