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


// cypress/support/commands.js
// Commandes personnalisées pour la Todo App
Cypress.Commands.add('addTodo', (text) => {
    cy.get('[placeholder*="tâche"]').type(text)
    cy.get('button').contains('Ajouter').click()
    })
    Cypress.Commands.add('toggleTodo', (todoText) => {
    cy.contains(todoText)
    .parent()
    .find('input[type="checkbox"]')
    .click()
    })
    Cypress.Commands.add('deleteTodo', (todoText) => {
    cy.contains(todoText)
    .parent()
    .find('button[title="Supprimer"]')
    .click()
    })
    Cypress.Commands.add('getTodoCount', () => {
    return cy.get('[data-testid^="todo-"]').its('length')
    })
    5 / 40
    Cypress.Commands.add('clearAllTodos', () => {
    cy.window().then((win) => {
    win.localStorage.removeItem('todoApp_todos')
    })
    })
    // Commande pour attendre que l'app soit chargée
    Cypress.Commands.add('waitForApp', () => {
    cy.contains('Todo App').should('be.visible')
    cy.get('[placeholder*="tâche"]').should('be.visible')
    })