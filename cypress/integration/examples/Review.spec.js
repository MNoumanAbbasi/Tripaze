/// <reference types="cypress" />

describe('Review Company', () => {
  const companyProfile = '/companyProfile/MnABr3SQtYVZ7437Acc1jIN8f7S2';
  const review = 'Test Review';

  it('Guest User can see review button', () => {
    cy.signout();
    cy.wait(2000);
    cy.visit(companyProfile);
    cy.wait(3000);
    cy.get('.ReviewSection').get('button').contains('Add Review');
  });

  it('Guest User cannot add review', () => {
    cy.get('.ReviewSection')
      .get('button')
      .contains('Add Review')
      .click({ force: true });
    cy.get('.modal-content');
  });

  it('Signed in User can see review button', () => {
    cy.signinUser();
    cy.wait(2000);
    cy.visit(companyProfile);
    cy.wait(3000);
    cy.get('.ReviewSection').get('button').contains('Add Review');
  });

  it('Signed in User can add review', () => {
    cy.get('.ReviewSection')
      .get('button')
      .contains('Add Review')
      .click({ force: true });
    cy.get('.ReviewSection').get('.dv-star-rating');
    cy.get('.ReviewSection')
      .get('[data-cy=review-input]')
      .type(review, { force: true });
    cy.get('.ReviewSection').get('[data-cy=add]').click({ force: true });
  });

  it('Confirmation dialog box on successful review', () => {
    cy.get('.swal-overlay').should('contain', 'added');
    cy.get('.swal-button--confirm').click({ force: true });
  });

  it('New Review is displayed on profile', () => {
    cy.get('.ReviewSection').should('contain', 'UserTest'); // default Username for signin user
    cy.get('.ReviewSection').should('contain', review);
  });

  it('Same signed in user cannot add more than one review', () => {
    cy.get('.ReviewSection')
      .get('button')
      .contains('Add Review')
      .click({ force: true });
    cy.get('.swal-overlay');
    cy.get('.swal-button--confirm').click();
  });

  it('Signed in user can remove its review', () => {
    cy.get('.ReviewSection')
      .get('button[data-cy=remove]')
      .click({ force: true });
    cy.get('.swal-overlay');
  });

  it('Clicking on cancel on the confirmation dialog box should not do any changes', () => {
    cy.get('.swal-button--cancel').click();
    cy.get('.ReviewSection').should('contain', 'UserTest'); // default Username for signin user
    cy.get('.ReviewSection').should('contain', review);
  });

  it('Clicking on delete on the confirmation dialog box should delete the review', () => {
    cy.get('.ReviewSection')
      .get('button[data-cy=remove]')
      .click({ force: true });
    cy.get('.swal-overlay');
    cy.get('.swal-button--confirm').click();
    cy.get('.swal-overlay').should('contain', 'success');
    cy.get('.ReviewSection').not('contain', 'UserTest'); // default Username for signin user
    cy.get('.ReviewSection').not('contain', review);
  });
});
