import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dashboard'
 
describe('login', function () {

  context('quando o usuario é muito bom', function () {

    const user = {
      name: 'Peter Parker',
      email: 'spiderman@samuraibs.com',
      password: 'pwd1234',
      is_provider: true
     }

     before(function () {
      cy.task('removeUser', user.email)
      .then(function (result) {
          console.log(result)
  })

  cy.request(
      'POST',
      'http://localhost:3333/users',
      user
  ).then(function (response) {
      expect(response.status).to.eq(200)
  })
  })

    it('deve logar com sucesso', function(){
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      dashPage.header.userLoggedIn(user.name)
    })
    
  })
})