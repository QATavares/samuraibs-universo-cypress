import signupPage from '../support/pages/signup'

//Agrupador de casos de testes
describe('cadastro', function () {
  
  before(function(){
    cy.fixture('signup').then(function(signup){
      this.sucess = signup.sucess
      this.email_dup = signup.email_dup
      this.email_inv = signup.email_inv
      this.short_password = signup.short_password
    })
  })


  context('quando é um novo usuário', function(){

    before(function(){
    // removendo o usuário ára que a massa seja sempre válida
    cy.task('removeUser', this.sucess.email)
      .then(function (result) {
        console.log(result)
    })

    })

    it('deve cadastrar com sucesso', function () {

      signupPage.go()
      signupPage.form(this.sucess)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    })
  
  })

  context('quando o e-mail já existe na base de dados', function(){
    before(function(){
      cy.postUser(this.email_dup)
    })
      
    it('deve exibir email já cadastrado', function () {
        signupPage.go()
        signupPage.form(this.email_dup)
        signupPage.submit()
        signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
      })
      })

  context('quando o e-mail é incorreto', function(){

    it('deve exibir mensagem de alerta', function(){
      signupPage.go()
      signupPage.form(this.email_inv)
      signupPage.submit()
      signupPage.alert.haveText('Informe um email válido')
    })
  })

  context('quando a senha não atingiu 6 caracteres', function(){

    const passwords = ['1', '1b', '1sa', 'asd5', '1@3A5']

    passwords.forEach(function (p) {
      it('não deve cadastrar com a senha : ' + p , function(){
        
        this.short_password.password = p

        signupPage.go()
        signupPage.form(this.short_password)
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


