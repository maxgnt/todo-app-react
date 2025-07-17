// cypress/e2e/app-loads.cy.js
describe('Application loads correctly', () => {
    it('should load the application', () => {
    cy.visit('/')
    cy.waitForApp()
    // Vérifier les éléments principaux
    cy.contains('Todo App').should('be.visible')
    cy.contains('Organisez vos tâches efficacement').should('be.visible')
    cy.get('[placeholder*="tâche"]').should('be.visible')
    cy.get('button').contains('Ajouter').should('be.visible')
    })
    it('should show empty state initially', () => {
    cy.visit('/')
    cy.waitForApp()
    cy.contains('Aucune tâche').should('be.visible')
    cy.contains('Ajoutez votre première tâche').should('be.visible')
    })
    })