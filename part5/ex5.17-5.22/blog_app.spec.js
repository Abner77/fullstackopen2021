/* eslint-disable no-undef */

describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')    
  })

  it('Test good login', function () {    
    cy.get('#user').type('ppp')
    cy.get('#password').type('ppp')
    cy.get('#login').click()
    cy.contains('Logged as ppp')        
  })

  it('Bad login', function() {
    // cy.get('#logoff').click()
    cy.get('#user').type('jjj')
    cy.get('#password').type('sfsf')
    cy.get('#login').click()
    cy.contains('wrong user or password')        
  })

  it('Test creating blog', function () {    
    cy.get('#user').type('ppp')
    cy.get('#password').type('ppp')
    cy.get('#login').click()
    cy.contains('Logged as ppp')        
    cy.get('#toggle').click()
    cy.get('#title').type('el mercadillo de San Antonio')
    cy.get('#url').type('http://www.mercadosanantonio.com')
    cy.get('#save').click() 
    cy.contains('el mercadillo de San Antonio')
    cy.contains('http://www.mercadosanantonio.com')
  })

  it ('Testing a like', function () {
    cy.get('#user').type('ppp')
    cy.get('#password').type('ppp')
    cy.get('#login').click()
    cy.contains('Logged as ppp')        
    cy.contains('view').click() 
    cy.contains('like').click() 
    cy.contains('blog updated')
  })

})

