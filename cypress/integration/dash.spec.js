
describe('dashboard', function () {
  context('quando o cliente daz um agendamento no app mobile', function () {

    const data = {
      customer: {
        name: 'Nikki Sixx',
        email: 'sixx@motleycrue.com',
        password: 'pwd123',
        is_provider: false
      },
      provider: {
        name: 'Ramon Valdes',
        email: 'ramon@televisa.com',
        password: 'pwd123',
        is_provider: true
      }
    }

    before(function () {
      cy.postUser(data.provider)
      cy.postUser(data.customer)

      cy.apiLogin(data.customer)
      cy.log('Consegui pegar o token ' + Cypress.env('apiToken'))

      cy.setProviderId(data.provider.email)
    })

    it('o mesmo deve ser exibido no dashboard', function () {
      cy.log('Id do Ramon é ' + Cypress.env('providerId'))
      cy.createAppointment()
    })
  })
})

//Trabalhando com as datas
import moment from 'moment'

Cypress.Commands.add('createAppointment', function () {

  let now = new Date()

  now.setDate(now.getDate() + 1)


  const day = moment(now).format('YYYY-MM-DD 14:00:00')

  cy.log(day)
})


//Pegando o Id do usuário
Cypress.Commands.add('setProviderId', function (providerEmail) {

  cy.request({
    method: 'GET',
    url: 'http://localhost:3333/providers',
    headers: {
      authorization: 'Bearer ' + Cypress.env('apiToken')
    }
  }).then(function (response) {
    expect(response.status).to.eq(200)
    cy.log(response.body)

    const providerList = response.body

    providerList.forEach(function (provider) {
      if (provider.email === providerEmail) {
        Cypress.env('providerId', provider.id)
      }
    })

  })
})

//Fazendo login via API
Cypress.Commands.add('apiLogin', function (user) {
  const payload = {
    email: user.email,
    password: user.password
  }

  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/sessions',
    body: payload
  }).then(function (response) {
    expect(response.status).to.eq(200)
    console.log(response.body.token)
    Cypress.env('apiToken', response.body.token)
  })
})