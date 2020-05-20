/// <reference types="cypress" />

describe('Company Profile', () => {
  before(() => {
    cy.visit('/companyProfile/3OAS4ZfMJmXpTWnko9tJBUYfijj2/');
    setTimeout(5000);
  });
  
  it('company name displayed', () => {
    cy.get('[data-cy=company-name]').should('not.be.empty');
  });
  it('phone number displayed', () => {
    cy.get('[data-cy=contact]').should('not.be.empty');
  });
  it('address displayed', () => {
    cy.get('[data-cy=address]').should('not.be.empty');
  });
  it('reviews displayed', () => {
    cy.get('[data-cy=rating-bar]').should('not.be.empty');
  });
});
