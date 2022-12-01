
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  // @ts-expect-error
  return originalFn(url, {
    ...options,
    auth: {
      username: 'moravio', // Cypress.env('username'),
      password: 'rl#yEzsC[c' // Cypress.env('password')
    }
  })
})
