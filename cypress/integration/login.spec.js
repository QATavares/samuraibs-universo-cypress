import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dashboard'
 
describe('login', function(){

  context('quando o usuario é muito bom', function(){

    const user = {
      name: 'Peter Parker',
      email: 'spiderman@samuraibs.com',
      password: 'pwd1234'
     }

    it('deve logar com sucesso', function(){
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      dashPage.userLoggedIn(user.name)
    })
    
  })
})
