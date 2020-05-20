/// <reference types="cypress" />

describe('Sign in Company', () => {
  before(() => {
    cy.visit('/signin');
    setTimeout(5000);
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

  it('Successful login with valid details', () => {
    cy.get('button[type=submit]').click();
  })
});
