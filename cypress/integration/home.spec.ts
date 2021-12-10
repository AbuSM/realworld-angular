describe('Home page test', () => {
    const tags = ["cypress", "article"];
    beforeEach(() => {
        cy.intercept('GET', 'tags*', {body: {tags}}).as('getTags');
    });

    it('Visits the initial project page', () => {
        cy.visit('/')
        cy.contains('conduit');
        cy.contains('A place to share your knowledge');
        cy.contains('Home');
        cy.contains('Sign in')
        cy.contains('Sign up');
    });

    it('check tags', () => {
        cy.visit('/');
        cy.url().should('include', '/');
        cy.wait('@getTags');
        cy.contains('Popular Tags');
        cy.get('.sidebar').should('have.css', 'background-color').and('eq', 'rgb(243, 243, 243)');
        cy.get('.sidebar').find('span.tag.tag-pill').then($el => {
            const elArr = Array.from($el);
            for (let i = 0; i < elArr.length; i++) {
                expect(elArr[i].innerText.trim()).equals(tags[i]);
            }
        })
    })
})
