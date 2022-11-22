import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dashboard'
import login from '../support/pages/login'
 
describe('login', function () {

  context('quando o usuario é muito bom', function () {

    const user = {
      name: 'Peter Parker',
      email: 'spiderman@samuraibs.com',
      password: 'pwd1234',
      is_provider: true
     }

     before(function () {
      cy.postUser(user)
  })


    it('deve logar com sucesso', function(){
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      dashPage.header.userLoggedIn(user.name)
    })
    
  })

  context('quando o usuário é bom mas a senha está incorreta', function(){

    let user = {
      name: 'Tony Stark',
      email: 'tstark@samuraibs.com',
      password: 'pwd1234',
      is_provider: true
    }

    before(function(){
      cy.postUser(user)
      user.password = 'pdw4321'
    })

    it('deve notificar erro de credenciais', function(){
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()
    })
  })
})

