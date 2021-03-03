const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Home', () => {
  it('should render correctly page home', () => {
    cy.visit(APP_URL)
  })

  it('should correctly in display image and text on home page', () => {
    cy.visit(APP_URL)

    cy.get("h2").contains('Competições eliminatórias')
    cy.get("p").contains('Sorteie chaves de torneios e ligas eliminatórias ou mata-mata.')
    cy.get("img").should('have.attr', 'alt', 'Troféu')
  });

  it('should render page home and display correct button create competition', () => {
    cy.visit(APP_URL)

    cy.get('#btn-new-competition')
  })

  it('should correctly redirect on click in button create competition', () => {
    cy.visit(APP_URL)

    cy.url().should('include', '/')
    cy.get('#btn-new-competition').click()
    cy.url().should('include', '/create-competition')
  })
})
