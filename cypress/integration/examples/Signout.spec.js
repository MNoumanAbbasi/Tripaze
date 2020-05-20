/// <reference types="cypress" />

describe('Sign out', () => {
  before(() => {
    cy.signout();
    cy.wait(3000);
  });

  it('Sign out option displayed in Navbar (User)', () => {
    cy.signinUser();
    cy.wait(3000);
    cy.get('#navbarSupportedContent').get('[data-cy=signout]');
  });

  it('Signs out user successfully', () => {
    cy.get('[data-cy=signout]').click();
    cy.wait(3000);
    cy.get('[data-cy=signinBtn]');
  });

  it('Sign out option displayed in Navbar (Company)', () => {
    cy.signinCompany();
    cy.wait(3000);
    cy.get('#navbarSupportedContent').get('[data-cy=signout]');
  });

  it('Signs out company successfully', () => {
    cy.get('[data-cy=signout]').click();
    cy.wait(3000);
    cy.get('[data-cy=signinBtn]');
  });
});
