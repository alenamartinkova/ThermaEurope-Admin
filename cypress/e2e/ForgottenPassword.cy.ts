
describe('forgotten password page', () => {
  const loginUrl = '/login'
  const newPasswordUrl = '/new-password/617a3b8623484b0aa7294fb42678b7878b9ab8e5c279b0218c3241d3ed3028d6?email=development%40moravio.com'
  const getApp = () => cy.get('#app')
  const getEmail = () => getApp().find('#email')
  const getPassword = () => getApp().find('#password')
  const getPasswordConfirmation = () => getApp().find('#password_confirmation')
  const getNewPasswordForm = () => getApp().find('[data-testid=new-password-form]')

  before(() => {
    cy.fixture('login.json').then(login => {
      this.login = login
    })
  })

  it('send forgotten password form', () => {
    cy.server()
    cy.route('POST', '**/forgotten-password').as('postForgottenPassword');
    cy.route('GET', '**/login').as('getLogin');
    cy.route('GET', '**/forgotten-password').as('getForgottenPassword');


    cy.visit(loginUrl)

    getApp().find('[data-testid=forgotten-password-link]').click()
    cy.wait('@getForgottenPassword')

    cy.location('pathname').should('eq', '/forgotten-password')

    getApp().find(('[data-testid=are-there-problems-button]')).click()
    getApp().find('[data-testid=customer-service-link]')
    getEmail().should('not.exist')

    getApp().find('[data-testid=back-button]').click()
    getEmail().should('exist')

    getEmail().type(this.login.email)
    getApp().find('[data-testid=forgotten-password-form]').submit()
    cy.wait('@postForgottenPassword')

    getApp().find('[data-testid=back-to-login-button]').should('exist').click()
    cy.wait('@getLogin')
    cy.location('pathname').should('eq', loginUrl)
  })

  it('fill the new password form', () => {
    cy.server()
    cy.visit(newPasswordUrl)

    cy.route('POST', '**/password/reset').as('postPasswordReset');


    getPassword().should('contain.value', '')
    getPasswordConfirmation().should('contain.value', '')
    getNewPasswordForm().submit()
    cy.wait('@postPasswordReset')

    getPassword().should('have.class', 'error')
    getPasswordConfirmation().should('not.have.class', 'error')

    getPassword().type('xxx')
    getPasswordConfirmation().type('xxx')
    getNewPasswordForm().submit()
    cy.wait('@postPasswordReset')

    getPassword().should('have.class', 'error')
    getPasswordConfirmation().should('not.have.class', 'error')

    getApp().find('[data-testid=generate-password-button]').click()
    getPassword().invoke('val').then(val1 => {
      expect(val1).has.length(10)

      getPasswordConfirmation().invoke('val').then(val2 => {
        expect(val1).equals(val2)
      })
    })

    getNewPasswordForm().submit()
    cy.wait('@postPasswordReset')

    getPassword().should('not.have.class', 'error')
    getPasswordConfirmation().should('not.have.class', 'error')
  })

  it('new password redirect', () => {
    cy.login(this.login.email, this.login.password)

    cy.visit('/password-changed')
    cy.get('[data-testid=password-changed-box]').should('exist')

    cy.wait(8000)
    cy.location('pathname').should('eq', '/')
  })
})
