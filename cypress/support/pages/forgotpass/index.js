import { el } from './elements'

class ForgotPassPage {

  go() {
    cy.visit('/forgot-password')
  }

  form(email) {
    cy.get(el.email)
      .clear()
      .type(email)
  }

  submit() {
    cy.contains('button[type=submit]', 'Recuperar').click()
  }
}

export default new ForgotPassPage()