
describe('login page', () => {
  const loginUrl = '/login'
  const getForm = () => cy.get('[data-testid=login-form]')
  const getEmail = () => getForm().find('#email')
  const getPassword = () => getForm().find('#password')

  before(() => {
    cy.fixture('login.json').then(login => {
      this.login = login
    })
  })

  it('displays login form', () => {
    cy.visit(loginUrl)

    getEmail().should('exist').should('have.value', '')
    getPassword().should('exist').should('have.value', '')
    getForm().find('button')
      .should('have.attr', 'type', 'submit')
      .should('exist')
  })

  it('should redirect to login page', () => {
    cy.visit('/')
    cy.location('pathname').should('eq', '/login')
  })

  it('should validate login form', () => {
    cy.server()
    cy.route('POST', '**/login').as('postLogin');

    cy.visit(loginUrl)

    getEmail().should('not.have.class', 'error')
    getPassword().should('not.have.class', 'error')

    getForm().submit()
    cy.wait('@postLogin')

    getEmail().should('have.class', 'error')
    getPassword().should('have.class', 'error')

    cy.visit(loginUrl)

    getEmail().type('xxx')
    getPassword().type('xxx')

    getForm().submit()
    cy.wait('@postLogin')

    getEmail().should('have.class', 'error')
    getPassword().should('not.have.class', 'error')

    getEmail().clear().type('john.doe@email.com')

    getForm().submit()
    cy.wait('@postLogin')

    getEmail().should('have.class', 'error')
    getPassword().should('not.have.class', 'error')

    cy.location('pathname').should('eq', loginUrl)

    getEmail().clear().type(this.login.email)
    getPassword().clear().type(this.login.password)

    getForm().submit()
    cy.wait('@postLogin')

    cy.location('pathname').should('eq', '/')
  })
})
