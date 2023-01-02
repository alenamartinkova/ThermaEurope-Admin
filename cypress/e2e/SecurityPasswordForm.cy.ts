describe('security_password', () => {
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

  it('test submit form', () => {
    cy.login(this.login.email, this.login.password)
    cy.route('GET', '**/security').as('getSecurity')

    cy.get('[data-testid=account-menu]').find('.account-menu-trigger').click()
    cy.get('[data-testid=account-menu]').find('[data-testid=security]').click()

    cy.get('[data-testid=security_password_block]').find('[data-testid=account_edit_button]').click()

    // change the password from current to current, so we do not alter data
    cy.get('#password').type(this.login.password)
    cy.get('#password_changed').type(this.login.password)
    cy.get('#password_changed_confirmation').type(this.login.password)

    cy.get('[data-testid=security_password_block]').find('[data-testid=account_save_button]').click()

    cy.wait('@getSecurity')
    cy.get('[data-testid=security_password_msg]').should('exist')
  })
})
