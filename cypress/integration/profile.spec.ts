describe('check user page', () => {
    const imgUrl = 'https://api.realworld.io';
    before(() => {
        cy.fixture('articles.json');
    });
    beforeEach(() => {
        cy.login();
        cy.visit('/#/user/test3');
    })
    it('Check all stuff in page', () => {
        cy.intercept('articles?author*', {fixture: 'articles.json'}).as('getAuthorArticles');
        cy.wait('@getAuthorArticles');
        cy.contains('test3');
        cy.get('img.user-img').invoke('attr', 'src').should('contain', imgUrl);
        cy.contains('Home');
        cy.contains('New article');
        cy.contains('Settings');
        cy.contains('Edit Profile Settings');
        cy.contains('My Articles');
        cy.get('div.post').should('contain.html', 'app-profile-header');
        cy.get('.post-header').should('contain.html', 'img').get('.post-header img').then(($el) => {
            expect($el[0].src).contains(imgUrl);
        });
        cy.contains('Favorited Articles').click();
        cy.contains('No favorited articles are here... yet.');
    })
    it('Check settings page', () => {
        cy.contains('Edit Profile Settings').click();
        cy.url().should('include', 'settings');
        cy.get('input[formcontrolname="image"]').should('contain.value', imgUrl);
        cy.get('input[formcontrolname="username"]').should('contain.value', 'test3');
        cy.get('input[formcontrolname="email"]').should('contain.value', 'test@test.ru');
        cy.get('textarea[formcontrolname="bio"]').should('not.contain.value');
        cy.get('input[type=password]').should('be.empty');
    })
})
