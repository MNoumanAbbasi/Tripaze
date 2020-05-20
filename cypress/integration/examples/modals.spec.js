/// <reference types="cypress" />

describe('Dialog Box Testing: Sign In To Access (FAQs)', () => {
  before(() => {
    cy.signout();
    cy.visit('http://localhost:3000/trip/1jeIEbVyS2xV0z8UyrFR');
  });
  setTimeout(4000);

  // Privilege restriction
  it('Guest users not allowed to post questions', () => {
    cy.get('[data-cy=addquestion]').click({ force: true });
    cy.contains('You can only add questions if you are signed in.');
  });

  // Sign in button works
  it('Clicking on sign in redirects to the sign in page', () => {
    cy.get('[data-cy2=signinBtnDialog]').click({ force: true });
    cy.url().should('eq', 'http://localhost:3000/signin'); // => true
  });

  // Sign up button works
  it('Clicking on sign up redirects to the sign up choice page', () => {
    cy.visit('http://localhost:3000/trip/1jeIEbVyS2xV0z8UyrFR');
    cy.get('[data-cy=addquestion]').click({ force: true });
    cy.get('[data-cy=signupBtnDialog]').click({ force: true });
    cy.url().should('eq', 'http://localhost:3000/signupchoice'); // => true
  });
});

describe('Dialog Box Testing: Sign In To Access (Reviews)', () => {
  before(() => {
    // cy.signout();
    cy.visit(
      'http://localhost:3000/companyProfile/3OAS4ZfMJmXpTWnko9tJBUYfijj2'
    );
  });
  setTimeout(4000);

  // Privilege restriction
  it('Guest users not allowed to post reviews', () => {
    cy.get('[data-cy=addreview]').click({ force: true });
    cy.contains('You can only add reviews if you are signed in.');
  });

  // Sign in button works
  it('Clicking on sign in redirects to the sign in page', () => {
    cy.get('[data-cy2=signinBtnDialog]').click({ force: true });
    cy.url().should('eq', 'http://localhost:3000/signin'); // => true
  });

  // Sign up button works
  it('Clicking on sign up redirects to the sign up choice page', () => {
    cy.visit(
      'http://localhost:3000/companyProfile/3OAS4ZfMJmXpTWnko9tJBUYfijj2'
    );
    cy.get('[data-cy=addreview]').click({ force: true });
    cy.get('[data-cy=signupBtnDialog]').click({ force: true });
    cy.url().should('eq', 'http://localhost:3000/signupchoice'); // => true
  });
});

describe('Dialog Box Testing: Search Results', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });
  setTimeout(4000);
  // Privilege restriction
  it('Error message when no trips found', () => {
    // cy.get('input[data-cy=searchDest]').clear().type(nonExistingTrip);
    cy.get('[data-cy=searchButton]').click({ force: true });
    cy.contains('No Trips found');
  });

  // Go back button works
  it('Clicking on go back redirects to the home page', () => {
    cy.contains('Go Back').click({ force: true });
    cy.url().should('eq', 'http://localhost:3000/'); // => true
  });
});
