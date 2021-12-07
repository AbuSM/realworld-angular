describe('Home page test', () => {
    it('Visits the initial project page', () => {
        cy.visit('/')
        cy.contains('conduit');
        cy.contains('A place to share your knowledge');
        cy.contains('Home');
        cy.contains('Sign in')
        cy.contains('Sign up');
    });
})
