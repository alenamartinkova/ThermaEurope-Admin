
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
