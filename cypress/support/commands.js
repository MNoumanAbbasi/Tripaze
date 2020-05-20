// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// -- This will sign out the user if signed in --
Cypress.Commands.add('signout', () => {
  cy.visit('/');
  cy.wait(500);
  cy.get('#navbarSupportedContent').then(($navbar) => {
    if ($navbar.find('[data-cy=signout]').length) {
      cy.get('[data-cy=signout]').click();
      cy.wait(500);
    }
  });
});

// -- This will sign in a user --
Cypress.Commands.add('signinUser', () => {
  const email = 'qakjcdwwxzgrpyjwld@awdrt.org';
  const password = 'password123';
  cy.visit('/signin');
  cy.wait(500);
  cy.get('body').then(($body) => {
    if ($body.find('Sign In').length) {
      cy.get('#email').clear().type(email);
      cy.get('#password').clear().type(password).type('{enter}');
    }
  });
});

// -- This will sign in a verfied company --
Cypress.Commands.add('signinCompany', () => {
  const email = 'mnsxirqsoiawfqxhhz@ttirv.com';
  const password = 'password123';
  cy.visit('/signin');
  cy.wait(500);
  cy.get('body').then(($body) => {
    if ($body.find('Sign In').length) {
      cy.get('#email').clear().type(email);
      cy.get('#password').clear().type(password).type('{enter}');
    }
  });
});
