// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    customCommand(param: any): typeof customCommand;
  }
}
//
function customCommand(param: any): void {
  console.warn(param);
}
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
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
// Cypress.Commands.add("login", (email, password) => {  })
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

import Chainable = Cypress.Chainable;

Cypress.Commands.add('login' as keyof Chainable, () => {
    cy.visit('#/login');
    cy.get('[type=email]').type('test@test.ru');
    cy.get('[type=password]').type('test');
    cy.get('button').click();
    return;
})

Cypress.Commands.add('logout', () => {
    cy.contains('Login').should('not.exist')
    cy.get('.avatar').click()
    cy.contains('Logout').click()
})
