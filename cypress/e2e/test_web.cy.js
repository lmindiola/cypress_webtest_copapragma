/// <reference types="cypress" />

context('pragma test', () => {
  var cookies 
  var sesions
  
  beforeEach(() =>  {
    Cypress.config()
    cy.visit('http://opencart.abstracta.us/')
    const user = 'mock@pragma.com'
    cy.session(user,() => {
      cy.visit('opencart.abstracta.us/index.php?route=account/login')
      cy.wait(100)
      cy.get('#input-email').type(user)
      cy.get('#input-password').type("Qwerty")
      cy.get('form > .btn').click()
      cy.getAllCookies(cookies)
      cy.getAllSessionStorage(sesions)
  })
  })

  describe('front end test', () => {

    it('add cart', () => {
      cy.visit('http://opencart.abstracta.us/')
      cy.get(':nth-child(1) > .product-thumb > .image > a > .img-responsive').click({ delay: 100 })
      cy.get('#button-cart').click({ delay: 100 })
      cy.get('.alert').should('have.class', 'alert alert-success alert-dismissible')
      
    })

    it('pay2', () => {
      cy.visit('https://opencart.abstracta.us/index.php?route=checkout/checkout')
      cy.get('#input-payment-firstname').type("tester")
      cy.get('#input-payment-lastname').type("luis")
      cy.get('#input-payment-company').type("pragma")
      cy.get('#input-payment-address-1').type("Zenith, Herbert St, Cardiff CF10 4DG, Reino Unido")
      cy.get('#input-payment-city').type("Cardiff")
      cy.get('#input-payment-postcode').type("CF10")
      cy.get('#input-payment-country').select("United Kingdom")
      cy.get('#input-payment-zone').select("Cardiff")
      cy.get('#button-payment-address').click()
      //cy.get(':nth-child(3) > .panel-heading > .panel-title > .accordion-toggle > .fa').click()
      cy.get('[type="checkbox"]')
      cy.get('[type="checkbox"]').not('[disabled]')
      .check().should('be.checked')
      cy.get('#button-payment-method').click()
      
    });
  })
})