
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  // @ts-expect-error
  return originalFn(url, {
    ...options,
    auth: {
      username: Cypress.env('username'),
      password: Cypress.env('password')
    }
  })
})
