/// <reference types="cypress" />

describe('Company Profile', () => {
  before(() => {
    cy.visit(
      'http://localhost:3000/companyProfile/3OAS4ZfMJmXpTWnko9tJBUYfijj2/'
    );
  });
  setTimeout(4000);
  it('company name displayed', () => {
    cy.contains('TripCompany');
  });
  it('phone number displayed', () => {
    cy.contains('TripCompany');
  });
  it('address displayed', () => {
    cy.contains('TripCompany');
  });
  it('company name displayed', () => {
    cy.contains('TripCompany');
  });
});
