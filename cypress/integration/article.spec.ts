import {ArticleModel} from "../../src/app/models";

describe('Editor page tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/#/editor');
        cy.fixture('new-article.json').then((article) => {
            cy.intercept('POST', 'articles*', article).as('createArticle');
            cy.intercept('GET', `${article.article.slug}`, article).as('getNewArticle');
        })
    });

    it('check inputs', () => {
        cy.get('input[type=text]').should('not.contain.value');
        cy.get('textarea[formcontrolname=body]').should('not.contain.value');
        cy.get('button').should('be.disabled').should('contain', 'Publish Article').should('have.css', 'background-color').and('eq', 'rgb(92, 184, 92)')
    });

    it('check text', () => {
        cy.get('input[formcontrolname=title]').type('hello world'.repeat(10)).then($el => {
            const val = $el.val() as string;
            expect(val.length).lessThan(51);
        });
        cy.get('input[formcontrolname=description]').type('test description');
        cy.get('textarea').type('test body for cypress'.repeat(10));
        cy.get('input[type=text]:last').type('test{enter}');
        cy.get('button').click();
        cy.intercept('GET', `articles*`, {fixture: 'new-article.json'}).as('getNewArticle');
        cy.wait('@createArticle').then((res) => {
            const article: ArticleModel = res.response.body.article;
            cy.url().should('include', `post/${article.slug}`);
            cy.wait('@getNewArticle');
            cy.contains('Delete Article');
            cy.contains(article.author.username);
            cy.get('img').should('have.attr', 'src').and('eq', article.author.image);
            cy.contains(article.body);
            cy.contains(article.title);
            cy.contains('Edit Article').click().then(() => {
                cy.url().should('include', `editor/${article.slug}`);
                cy.get('input[formcontrolname=title]').should('have.value', article.title);
                cy.get('input[formcontrolname=description]').should('have.value', article.description);
                cy.get('textarea').should('have.value', article.body);
                cy.get('.tag-list').then($el => {
                    if (article.tagList.length) {
                        const spans = Array.from($el.children('span'));
                        spans.forEach((span) => {
                            expect(article.tagList.includes((span.innerText as string).trim())).to.be.true;
                        })
                    }
                })
            })
        });
    });
})
