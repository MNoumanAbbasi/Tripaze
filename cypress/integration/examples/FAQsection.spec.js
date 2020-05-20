/// <reference types="cypress" />

describe('Testing FAQ section as a user', () => {
  const trip = '/trip/PJjYUEIGlE4mEmS0MSyu';
  const question = 'This is a test question';

  it('Guest User can see add question button', () => {
    cy.signout();
    cy.wait(2000);
    cy.visit(trip);
    cy.wait(3000);
    cy.get('.FAQSection').get('button').contains('Add Question');
  });

  it('Guest User cannot add question', () => {
    cy.get('.FAQSection')
      .get('button')
      .contains('Add Question')
      .click({ force: true });
    cy.get('.modal-content');
  });

  it('Signed in User can see Add Question button', () => {
    cy.signinUser();
    cy.wait(2000);
    cy.visit(trip);
    cy.wait(3000);
    cy.get('.FAQSection').get('button').contains('Add Question');
  });

  it('Signed in User can add Question', () => {
    cy.get('.FAQSection')
      .get('button')
      .contains('Add Question')
      .click({ force: true });
    cy.get('.FAQSection')
      .get('[data-cy=question-input]')
      .type(question, { force: true });
    cy.get('.FAQSection').get('[data-cy=add-question]').click({ force: true });
  });

  it('Confirmation dialog box on successfully adding question', () => {
    cy.get('.swal-overlay').should('contain', 'added');
    cy.get('.swal-button--confirm').click({ force: true });
  });

  it('New question is displayed on Trip page', () => {
    cy.get('.FAQSection').should('contain', question);
    cy.wait(3000);
    cy.signout();
  });
});

describe('Testing FAQ section as a signed in company', () => {
  const trip = '/trip/PJjYUEIGlE4mEmS0MSyu';
  const question = 'This is a test question';
  const answer = 'This is a test answer to the test question';
  const companyQuestion = 'This is a test question by the company';
  const companyAnswer =
    'This is a test answer to the test question by the company';
  it('Signed in Company can see user question', () => {
    cy.wait(3000);
    cy.signinCompany();
    cy.wait(2000);
    cy.visit(trip);
    cy.wait(3000);
    cy.get('.FAQSection').should('contain', question);
  });

  it('Signed in company can see add question button', () => {
    cy.get('.FAQSection').get('button').contains('Add Question');
  });
  it('Signed in Compny can add answer to user question', () => {
    cy.get('.FAQSection')
      .get('[data-cy=answer-input]')
      .type(answer, { force: true });
    cy.get('.FAQSection').get('[data-cy=add-answer]').click({ force: true });
  });

  it('Confirmation dialog box on successfully adding answer', () => {
    cy.get('.swal-overlay').should('contain', 'added');
    cy.get('.swal-button--confirm').click({ force: true });
  });

  it('New answer is displayed on trip page', () => {
    cy.get('.FAQSection').should('contain', answer);
  });

  it('Signed in company can add Question', () => {
    cy.get('.FAQSection')
      .get('button')
      .contains('Add Question')
      .click({ force: true });
    cy.get('.FAQSection')
      .get('[data-cy=question-input]')
      .type(companyQuestion, { force: true });
    cy.get('.FAQSection').get('[data-cy=add-question]').click({ force: true });
  });

  it('Signed in Compny can add answer to its own question', () => {
    cy.get('.FAQSection')
      .get('[data-cy=answer-input]')
      .type(companyAnswer, { force: true });
    cy.get('.FAQSection').get('[data-cy=add-answer]').click({ force: true });
  });

  it('New answer is displayed on trip page', () => {
    cy.get('.FAQSection').should('contain', companyAnswer);
  });
});
