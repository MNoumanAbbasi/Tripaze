/// <reference types="cypress" />

/**
 *  Using TripCompany as Test Case value
 */
describe('Sign in User', () => {
  before(() => {
    // Sign out if already signed in
    cy.signout();
    cy.visit('/signin');
    setTimeout(2000);
  });
  const email = 'qakjcdwwxzgrpyjwld@awdrt.org';
  const password = 'password123';

  it('Email field in focus', () => {
    cy.focused().should('have.id', 'email');
  });

  it('Email field accepts email input', () => {
    cy.get('#email').type(email).should('have.value', email);
  });

  it('Password field accepts password input', () => {
    cy.get('#password').type(password).should('have.value', password);
  });

  it('Invalid login attempt should fail', () => {
    cy.get('#email').clear().type('abc@invalid.com');
    cy.get('#password').clear().type('invalidpass').type('{enter}');
    cy.wait(1000);
    cy.get('.text-danger');
  });

  it('Successful login attempt', () => {
    cy.get('#email').clear().type(email).should('have.value', email);
    cy.get('#password').clear().type(password).type('{enter}');
    cy.wait(5000);
    cy.get('#navbarSupportedContent').contains('UserTest');
  });

  it('Redirected to homepage on sign in', () => {
    cy.url().should('contain', '/');
  });
});
