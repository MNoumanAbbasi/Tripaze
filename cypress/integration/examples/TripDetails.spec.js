/// <reference types="cypress" />

describe('Trip details', () => {
  before(() => {
    cy.visit('http://localhost:3000/trip/loDX1WxLBxRgV2UyQYqh');
  });
  setTimeout(5000);

  it('Trip  title displayed', () => {
    cy.get('[data-cy=trip-title]').should('not.be.empty');
  });
  it('Trip price displayed', () => {
    cy.get('[data-cy=trp-price]').should('not.be.empty');
  });
  it('Company name displayed', () => {
    cy.get('[data-cy=company-name]').should('not.be.empty');
  });
  it('Departure date displayed', () => {
    cy.get('[data-cy=departure-date]').should('not.be.empty');
  });
  it('Trip duration displayed', () => {
    cy.get('[data-cy=trip-duration]').should('not.be.empty');
  });
  it('Departure location displayed', () => {
    cy.get('[data-cy=departure-location]').should('not.be.empty');
  });
  it('Link to company profile displayed via company name', () => {
    cy.get('[data-cy=company-link]').should('not.be.empty');
  });
  it('Company rating displayed', () => {
    cy.get('[data-cy=company-rating]').should('not.be.empty');
  });
  it('Number of reviews displayed', () => {
    cy.get('[data-cy=number-reviews]').should('not.be.empty');
  });
  it('Trip description displayed', () => {
    cy.get('[data-cy=trip-description]').should('not.be.empty');
  });
  it('Main attraction displayed', () => {
    cy.get('[data-cy=main-attractions]').should('not.be.empty');
  });
  it('Map displayed', () => {
    cy.get('[data-cy=trip-map]').should('not.be.empty');
  });
  it('Departure date displayed', () => {
    cy.get('[data-cy=departure-date]').should('not.be.empty');
  });
  it('FAQ section displayed', () => {
    cy.get('[data-cy=faq-section]').should('not.be.empty');
  });
  it('Clicking on company name redirects to company profile', () => {
    cy.get('[data-cy=company-link]').click({ force: true });
    cy.wait(2000);
    cy.url().should('contain', '/companyProfile/');
  });
});
