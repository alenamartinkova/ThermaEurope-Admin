
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  // @ts-expect-error
  return originalFn(url, {
    ...options,
    auth: {
      username: Cypress.env('USERNAME'),
      password: Cypress.env('PASSWORD')
    }
  })
})
