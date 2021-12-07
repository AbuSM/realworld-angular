import {tick} from "@angular/core/testing";

describe('check user page', () => {
    beforeEach(() => {
        cy.login();
    })
    it('Visit profile', () => {
        cy.visit('/#/user/test3');
        cy.contains('test3');
    })
})
