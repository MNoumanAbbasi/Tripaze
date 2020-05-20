/// <reference types="cypress" />

describe('Edit Profile', () => {
  before(() => {
    cy.signout();
    cy.signinCompany();
    cy.wait(1000);
  });

  const newAddress = 'New test address';
  const newDescription = 'New test description';

  it('Edit Profile button displayed', () => {
    cy.get('[data-cy=editProfileBtn]');
  });

  it('Edit Profile button redirects to Edit page', () => {
    cy.get('[data-cy=editProfileBtn]').click();
    cy.url().should('contain', '/editprofile/');
  });

  it('Submiting with missing fields shows error', () => {
    cy.get('input[name=location]').clear();
    cy.get('button[type=submit]').click({ force: true });
    cy.get('.swal-overlay').should('contain', 'error');
    cy.get('.swal-button--confirm').click();
  });

  it('Add new address', () => {
    cy.get('input[name=location]')
      .clear()
      .type(newAddress)
      .should('have.value', newAddress);
  });

  it('Add new description', () => {
    cy.get('textarea[name=description]')
      .clear()
      .type(newDescription)
      .should('have.value', newDescription);
  });

  it('Submit button works', () => {
    cy.get('button[type=submit]').click();
  });

  it('Confirmation dialog box appears', () => {
    cy.wait(500);
    cy.get('.swal-overlay');
  });

  it('Clicking on confirm shows saved changes dialog box', () => {
    cy.get('.swal-button--confirm').click();
    cy.get('.swal-overlay').contains('success');
    cy.get('.swal-button--confirm').click();
  });

  it('Redirected to company profile', () => {
    cy.url().should('contain', '/companyprofile/');
  });

  it('Edited changes are visible on profile', () => {
    cy.contains(newAddress);
    cy.contains(newDescription);
  });
});
