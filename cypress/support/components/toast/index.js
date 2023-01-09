import { el } from './elements'

class Toast {
  shouldHaveText(expectText) {
    cy.get(el.toast, {timeout: 10000}) // Pegando o elemento (classe) TOAST
        .should('be.visible') // Verificando se ele o toast está visivel na página
        .find('p') //Procurando o elemento P (Contém texto) na página
        .should('have.text', expectText) // Validando que o usuário foi criado com sucesso.
  }
}

export default new Toast()