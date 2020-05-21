/// <reference types="cypress" />

describe('Searching as guest', () => {
  const trip = 'Fairy Meadows';
  before(() => {
    cy.signout();
    cy.visit('/');
  });
  setTimeout(4000);

  it('Searching valid trip found', () => {
    cy.get('input[data-cy=searchDest]').type(trip);
    cy.get('[data-cy=searchButton]').click({ force: true });
    cy.contains('Fairy Meadows');
  });
});

describe('Searching as logged in user', () => {
  const trip = 'Fairy Meadows';
  before(() => {
    cy.signinUser();
    cy.visit('/');
  });
  setTimeout(4000);

  it('Searching valid trip found', () => {
    cy.get('input[data-cy=searchDest]').type(trip);
    cy.get('[data-cy=searchButton]').click({ force: true });
    cy.contains('Fairy Meadows');
  });
});
