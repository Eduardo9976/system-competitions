const APP_URL =
  process.env.APP_URL || 'http://localhost:8080/create-competition'

describe('Formularios', () => {
  it('should render correctly page create new competition', () => {
    cy.visit(APP_URL)
  })

  it('should render correct options for create competition', () => {
    cy.visit(APP_URL)

    cy.get('h1').contains('Crie uma nova competição')
    cy.get('h3').contains('Informe os dados')
    cy.get('label').contains('Nome do Campeonato')
    cy.get('label').contains('Nome do Organizador')
    cy.get('label').contains('Qtd Times')
    cy.get('label').contains('Jogos de ida e volta')
    cy.get('label').contains('Times adicionados')
    cy.get('div').contains(
      'Adicione a quantidade exata de times para gerar o Campeonato.'
    )
  })

  it('should render buttom add new Team', () => {
    cy.get('#btn-add-new-team')
  })

  it('should add am red border for input labels empty', () => {
    cy.get('#titulo').click()
    cy.get('#productOwner').click()
    cy.get('#titulo').should('have.class', 'red')
    cy.get('#titulo').should('not.have.class', 'green')
    cy.get('#titulo').click()
    cy.get('#productOwner').should('have.class', 'red')
    cy.get('#productOwner').should('not.have.class', 'green')
  })

  it('should contains minlength 2 chars', () => {
    cy.get('#titulo').type('A')
    cy.get('#titulo').should('have.class', 'red')
    cy.get('#productOwner').click()
    cy.get('#titulo').click()
    cy.get('#titulo').type('Copa do Brasil')
    cy.get('#productOwner').click()
    cy.get('#titulo').should('have.class', 'green')
    cy.get('#titulo').should('not.have.class', 'red')

    cy.get('#productOwner').type('A')
    cy.get('#productOwner').should('have.class', 'red')
    cy.get('#titulo').click()
    cy.get('#productOwner').type('Fulano Sicrano')
    cy.get('#titulo').click()
    cy.get('#productOwner').should('have.class', 'green')
    cy.get('#productOwner').should('not.have.class', 'red')
  })

  it('should render correct options for select teams count', () => {
    cy.get('#qtd')
      .select('4 times')
      .should('not.have.value', '3')
      .select('4 times')
      .should('have.value', '4')
      .select('8 times')
      .should('not.have.value', '7')
      .select('8 times')
      .should('have.value', '8')
      .select('16 times')
      .should('not.have.value', '15')
      .select('16 times')
      .should('have.value', '16')
      .select('32 times')
      .should('not.have.value', '30')
      .select('32 times')
      .should('have.value', '32')
  })

  it('should save correctly option for checkbox', () => {
    cy.get('#roundTrip').uncheck()
    cy.get('#roundTrip').should('not.be.checked')
    cy.get('#roundTrip').check()
    cy.get('#roundTrip').should('be.checked')
  })

  it('should contains correctly value for teams inputs', () => {
    cy.get('#inputTeam').type(' ')
    cy.get('#btn-add-new-team').click()
    cy.get('#inputTeam').should('have.class', 'red')
    cy.get('#teams').should('not.contain', 'Sport')

    cy.get('#inputTeam').type('Sport')
    cy.get('#btn-add-new-team').click()
    cy.wait(500)
    cy.get('#teams li').contains('Sport')
    cy.get('#teams').should('not.contain', 'Corinthians')

    cy.get('#inputTeam').type('Corinthians')
    cy.get('#btn-add-new-team').click()
    cy.wait(500)
    cy.get('#teams li').contains('Sport')
    cy.get('#teams li').contains('Corinthians')
  })

  it('should not render button add new team', () => {
    cy.get('#qtd').select('4 times')
    cy.get('#btn-add-new-team').should('contain', 'Adicionar')
    cy.get('#btn-add-new-team').should('not.contain', 'Times já adicionados')

    cy.get('#inputTeam').type('Corinthians')
    cy.get('#btn-add-new-team').click()
    cy.get('#inputTeam').type('Sport')
    cy.get('#btn-add-new-team').click()
    cy.get('#inputTeam').type('Vasco')
    cy.get('#btn-add-new-team').click()
    cy.get('#teams li').contains('Corinthians')
    cy.get('#teams li').contains('Sport')
    cy.get('#teams li').contains('Vasco')

    cy.get('#btn-add-new-team').should('contain', 'Times já adicionados')
    cy.get('#btn-add-new-team').should('not.contain', 'Adicionar')
    cy.get('#btn-add-new-team').should('have.attr', 'disabled')
    cy.get('#btn-add-new-team').should('have.class', 'disabled')
  })
  it('should render button create competition', () => {
    cy.get('.p-4').should('not.exist')
    cy.get('.confirm')
    cy.get(':nth-child(1) > :nth-child(2) > .far').click()
    cy.get('.p-4').contains(
      'Adicione a quantidade exata de times para gerar o Campeonato.'
    )
    cy.get('.confirm').should('not.exist')
    cy.get('#inputTeam').type('Sport')
    cy.get('#btn-add-new-team').click()
    cy.get('.confirm')
  })

  it('should not add duplicate teams', () => {
    cy.visit(APP_URL)

    cy.get('#inputTeam').should('not.have.class', 'red')
    cy.get('#inputTeam').type('Corinthians')
    cy.get('#btn-add-new-team').click()
    cy.get('#inputTeam').type('Corinthians')
    cy.get('#btn-add-new-team').click()
    cy.get('#inputTeam').should('have.class', 'red')
});
})
