import fpPage from '../support/pages/forgotpass'

describe('resgate de senha', function(){

  before(function(){
    cy.fixture('recovery').then(function(recovery){
      this.data = recovery
    })
  })

  context('quando o usuário esquece a senha', function(){

    before(function(){
      cy.postUser(this.data)

    })

    it('deve poder resgatar por email', function() {
      fpPage.go()
      fpPage.form(this.data.email)
      fpPage.submit()

      cy.wait(7000);
    });
  })
})