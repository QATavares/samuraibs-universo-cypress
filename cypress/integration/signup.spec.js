import signupPage from '../support/pages/signup'

//Agrupador de casos de testes
describe('cadastro', function () {
  
  context('quando é um novo usuário', function(){
    // definindo a massa de testes
    const user = {
      name: 'Usuário Teste',
      email: 'email@samuraibs.com',
      password: 'pwd1234'
    }

    before(function(){
    // removendo o usuárop ára que a massa seja sempre válida
    cy.task('removeUser', user.email)
      .then(function (result) {
        console.log(result)
    })

    })

    it('deve cadastrar com sucesso', function () {

      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
 
    })
  
  })

  context('quando o e-mail já existe na base de dados', function(){
    //Massa de teste fixa para evitar possíveis erros
    const user = {
      name: 'Barbeiro',
      email: 'barbeiroFixo@samuraibs.com',
      password: 'pwd1234',
      is_provider: true
    }

    before(function(){
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
      
    it('deve exibir email já cadastrado', function () {
        signupPage.go()
        signupPage.form(user)
        signupPage.submit()
        signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
      })
      })

  context('quando o e-mail é incorreto', function(){
    const user = {
      name: 'Elizabeth Olson',
      email: 'liza.yahoo.com',
      password: 'pwd123'
    }
    it('deve exibir mensagem de alerta', function(){
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.alert.haveText('Informe um email válido')
    })
  })

  context('quando a senha não atingiu 6 caracteres', function(){

    const passwords = ['1', '1b', '1sa', 'asd5', '1@3A5']

    beforeEach(function(){
      signupPage.go()
    })

    passwords.forEach(function(p){
      it('não deve cadastrar com a senha : ' + p , function(){

        const user = { 
          name: 'Thor',
          email: 'thor@gmail.com',
          password: p
        }

        signupPage.go()
        signupPage.form(user)
        signupPage.submit()
      })
    })
    
    afterEach(function(){
      signupPage.alert.haveText('Pelo menos 6 caracteres')
    })
  })

  context('quando não preencho nenhum dos campos', function(){
    const alertMessages = [
      'Nome é obrigatório',
      'E-mail é obrigatório',
      'Senha é obrigatória'
    ]

    before(function(){
      signupPage.go()
      signupPage.submit()
    })

    alertMessages.forEach(function(alert){

      it('deve exibir ' + alert.toLowerCase(), function() {
        signupPage.alert.haveText(alert)
      })
    })
  })
})


