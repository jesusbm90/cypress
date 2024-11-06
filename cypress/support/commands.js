import '@testing-library/cypress/add-commands';

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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getElementByText', (selector, text) => {
  cy.contains(selector, text);
});

Cypress.Commands.add('assertTodoListLengthIs', (expectedLength) => {
  cy.findByTestId('todo-list')
    .children()
    .should('have.lengthOf', expectedLength);
});

Cypress.Commands.add('assertLinkHasSelectedClass', (linkText) => {
  cy.findByRole('link', { name: new RegExp(linkText, 'i') }).should(
    'have.class',
    'selected'
  );
});

Cypress.Commands.add('clickLinkByText', (linkText) => {
  cy.findByRole('link', { name: new RegExp(linkText, 'i') }).click();
});

Cypress.Commands.add('markTodoTaskAsCompleted', (todoItem, todoTaskName) => {
  cy.getElementByText(todoItem, todoTaskName)
    .findByTestId('todo-item-toggle')
    .click()
    .should('be.checked');
});

Cypress.Commands.add('addTodoTask', (todoTask) => {
  cy.findByTestId('text-input').type(`${todoTask}{enter}`);
});
