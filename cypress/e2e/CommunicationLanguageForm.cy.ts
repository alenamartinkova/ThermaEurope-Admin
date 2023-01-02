describe('communication_language', () => {
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

    cy.get('[data-testid=account-menu]').find('[data-testid=preferences]').should('exist')
    cy.get('[data-testid=account-menu]').find('[data-testid=preferences]').click()

    cy.get('[data-testid=communication_language_block]').should('exist')
  })

  it('test submit form', () => {
    cy.login(this.login.email, this.login.password)
    cy.route('GET', '**/preferences').as('getPreferences')

    cy.get('[data-testid=account-menu]').find('.account-menu-trigger').click()
    cy.get('[data-testid=account-menu]').find('[data-testid=preferences]').click()

    cy.get('[data-testid=communication_language_block]').find('[data-testid=account_edit_button]').click()
    cy.get('[data-testid=communication_language_block]').find('[data-testid=account_save_button]').click()

    cy.wait('@getPreferences')
    cy.get('[data-testid=communication_language_msg]').should('exist')
  })
})
