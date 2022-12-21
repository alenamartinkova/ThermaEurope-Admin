/// <reference types="cypress" />
export {}

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<Element>
    }
  }
}

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  let auth = {}
  if (Cypress.env('USERNAME') !== undefined && Cypress.env('PASSWORD') !== undefined) {
    auth = {
      auth: {
        username: Cypress.env('USERNAME'),
        password: Cypress.env('PASSWORD')
      }
    }
  }

  // @ts-expect-error
  return originalFn(url, {
    ...options,
    ...auth
  })
})

Cypress.Commands.addAll({ login: (email: string, password: string) => {
  cy.server();
  cy.route('POST', '**/login').as('postLogin');

  cy.visit('/login')
  cy.get('#email').clear().type(email)
  cy.get('#password').clear().type(password)
  cy.get('[data-testid=login-form]').submit()

  cy.wait('@postLogin')
}})
