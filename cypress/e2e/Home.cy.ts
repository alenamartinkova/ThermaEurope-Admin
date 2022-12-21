
describe('home page', () => {
  const url = '/'
  const getApp = () => cy.get('#app')

  before(() => {
    cy.fixture('login.json').then(login => {
      this.login = login
    })
  })

  it('test off-canvas menu', () => {
    // off-canvas menu should not exist on login page
    cy.get('[data-testid=off-canvas-trigger]').should('not.exist')

    cy.login(this.login.email, this.login.password)

    cy.route('GET', '**/reservation').as('getReservation');

    // close by close button
    cy.get('[data-testid=off-canvas-content]').should('not.exist')
    cy.get('[data-testid=off-canvas-trigger]').click()
    cy.get('[data-testid=off-canvas-content]').should('exist')
    cy.get('[data-testid=off-canvas-close-trigger]').click()
    cy.get('[data-testid=off-canvas-content]').should('not.exist')

    // close by click on overlay
    cy.get('[data-testid=off-canvas-trigger]').click()
    cy.get('[data-testid=off-canvas-content]').should('exist')
    cy.get('[data-testid=off-canvas-overlay]').click()
    cy.get('[data-testid=off-canvas-content]').should('not.exist')

    // click on mau item
    cy.get('[data-testid=off-canvas-trigger]').click()
    cy.get('[data-testid=off-canvas-content]').find('[data-testid=reservation]').click()
    cy.wait('@getReservation')
    cy.location('pathname').should('eq', '/reservation')
    cy.get('[data-testid=off-canvas-content]').should('not.exist')
  })

  it('test page menu', () => {
    cy.login(this.login.email, this.login.password)

    cy.route('GET', '**/reservation').as('getReservation');
    cy.route('GET', '**/').as('getHome');

    // page menu open by default
    cy.get('[data-testid=page-menu-toggle-trigger]').parent().find('.page-menu-item').each(item => {
      expect(item.find('svg')).exist
      expect(item.find('[data-testid=page-menu-item-label]')).exist
    })

    // collapse page menu
    cy.get('[data-testid=page-menu-toggle-trigger]').click()
    cy.get('[data-testid=page-menu-toggle-trigger]').parent().find('.page-menu-item').each(item => {
      expect(item.find('svg')).exist
      expect(item.find('[data-testid=page-menu-item-label]')).not.exist
    })

    // click menu item
    cy.get('[data-testid=page-menu-toggle-trigger]').parent().find('[data-testid=reservation]').click()
    cy.wait('@getReservation')
    cy.location('pathname').should('eq', '/reservation')

    // menu items are still collapsed
    cy.get('[data-testid=page-menu-toggle-trigger]').parent().find('.page-menu-item').each(item => {
      expect(item.find('svg')).exist
      expect(item.find('[data-testid=page-menu-item-label]')).not.exist
    })

    //test mobile page menu
    cy.viewport(575, 750)
    cy.get('[data-testid=page-menu-toggle-trigger]').should('not.be.visible')
    cy.get('[data-testid=page-title-menu-trigger]').should('be.visible')
    cy.get('[data-testid=page-title-menu-trigger]').click()

    cy.get('[data-testid=page-title-menu-trigger]').parent().find('[data-testid=page-menu]').should('be.visible')

    cy.get('[data-testid=page-title-menu-trigger]').parent().find('[data-testid=home]').click()
    cy.wait('@getHome')
    cy.location('pathname').should('eq', '/')

    cy.get('[data-testid=page-menu-toggle-trigger]').should('not.be.visible')
    cy.get('[data-testid=page-title-menu-trigger]').should('be.visible')
    cy.get('[data-testid=page-title-menu-trigger]').parent().find('[data-testid=page-menu]').should('not.exist')
  })

  it('test account menu', () => {
    // don't display account menu on login page
    cy.visit('/login')
    cy.get('[data-testid=account-menu]').should('not.exist')

    cy.login(this.login.email, this.login.password)
    cy.route('GET', '**/logout').as('getLogout');

    cy.get('[data-testid=account-menu]').find('.content').should('not.exist')
    cy.get('[data-testid=account-menu]').find('.account-menu-trigger').click()
    cy.get('[data-testid=account-menu]').find('.content').should('exist')

    cy.get('[data-testid=account-menu]').find('.account-menu-trigger').click({ force: true })
    cy.get('[data-testid=account-menu]').find('.content').should('not.exist')

    cy.get('[data-testid=account-menu]').find('.account-menu-trigger').click()
    cy.get('[data-testid=account-menu]').find('[data-testid=logout]').click()
    cy.wait('@getLogout')

    cy.location('pathname').should('eq', '/login')
  })

  it('test language menu', () => {
    cy.login(this.login.email, this.login.password)

    cy.route('GET', '**/locale/*').as('setLocale');

    cy.get('.language-menu').should('exist')

    cy.get('.language-menu .content').should('not.exist')
    cy.get('.language-menu-trigger').click()
    cy.get('.language-menu .content').should('exist')

    cy.get('.language-menu [data-state=unchecked]').click()
    cy.wait('@setLocale')
  })
})
