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
      cy.postUser(user).then(function(){
        user.password = 'pdw4321'
      })

    })

    it('deve notificar erro de credenciais', function(){
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      loginPage.toast.shouldHaveText(message)
    })
  })

  context('quando o formato do e-mail é inválido', function(){
    
    const emails = [
      'tstark.com',
      'gmail.com',
      '@gmail.com',
      '@',
      'tstrak',
      '12',
      '@#',
      'tstark!'
    ]

    before(function(){
      loginPage.go()
    })

    emails.forEach(function(email){
      it('não deve logar com o email: ' + email, function(){
        const user = { email: email, password: 'pwd123' }

        loginPage.form(user)
        loginPage.submit()
        loginPage.alert.haveText('Informe um email válido')
      })
    })
  })

  context('quando não preencho nenhum dos campos', function(){
    const alertMessages = [
      'E-mail é obrigatório',
      'Senha é obrigatória'
    ]

    before(function(){
      loginPage.go()
      loginPage.submit()
    })

    alertMessages.forEach(function(alert){

      it('deve exibir ' + alert.toLowerCase(), function() {
        loginPage.alert.haveText(alert)
      })
    })
  })
})

