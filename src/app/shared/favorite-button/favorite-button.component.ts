import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-favorite-button',
    templateUrl: './favorite-button.component.html',
})
export class FavoriteButtonComponent implements OnInit {
    @Input() article;
    constructor() {}

    ngOnInit(): void {}

    toggleFavorite() {}
}
