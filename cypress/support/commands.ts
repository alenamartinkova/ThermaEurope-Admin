
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  // @ts-expect-error
  return originalFn(url, {
    ...options,
    auth: {
      username: 'moravio',
      password: 'rl#yEzsC[c'
    }
  })
})
