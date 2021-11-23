import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-favorite-button',
    templateUrl: './favorite-button.component.html',
})
export class FavoriteButtonComponent {
    @Input() article;
    constructor() {}

    toggleFavorite() {}
}
