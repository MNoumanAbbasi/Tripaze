/// <reference types="cypress" />

/**
 *  Using TripCompany as Test Case value
 */
describe('Sign in Company', () => {
  before(() => {
    cy.visit('/signin');
    setTimeout(2000);
  });
  const email = 'company@tripaze.com';
  const password = 'password';

  it('Email field in focus', () => {
    cy.focused().should('have.id', 'email');
  });

  it('Email field accepts email input', () => {
    cy.get('#email').type(email).should('have.value', email);
  });

  it('Password field accepts password input', () => {
    cy.get('#password').type(password).should('have.value', password);
  });

  it('Invalid login attempt', () => {
    cy.get('#email').clear().type('abc@invalid.com');
    cy.get('#password').clear().type('invalidpass').type('{enter}');
    cy.wait(1000);
    cy.get('.text-danger').should('have.value');
  });

  it('Successful login attempt', () => {
    cy.get('#email').clear().type(email).should('have.value', email);
    cy.get('#password').clear().type(password).type('{enter}');
    cy.wait(5000);
    cy.url().should('contain', '/companyprofile/3OAS4ZfMJmXpTWnko9tJBUYfijj2');
  });
});
