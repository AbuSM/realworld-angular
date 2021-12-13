describe('Auth tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    xit('Visit sign in page', () => {
        cy.contains('Sign in').click();
        cy.url().should('include', '/login');
        cy.contains('Need an account?')
        cy.get('[type=email]').type('test');
        cy.get('[type=password]').type('test').then(_ => {
            cy.get('button').should('be.disabled');
        });
        cy.get('[type=email]').clear().type('test@test.ru').then(_ => {
            cy.get('button').click().then(_ => {
                cy.url().should('include', '/');
            })
        })
    });

    xit('Visit sign up page', () => {
        cy.contains('Sign up').click();
        cy.url().should('include', '/register');
        cy.contains('Have an account?');
        cy.get('[type=text]').should('have.attr', 'placeholder', 'Username').type('test');
        cy.get('[type=email]').should('have.attr', 'placeholder', 'Email').type('cypress@test.ru');
        cy.get('[type=password]').should('have.attr', 'placeholder', 'Password').type('test');
        cy.get('button').click();
        cy.get('app-errors-list').should('contain.text', 'username has already been taken');
        cy.get('[type=text]').clear().type('cypress');
        cy.get('button').click();
        cy.url().should('include', '/');
    });

})
