import { Component, Input } from '@angular/core';
import { CardModel } from '../../models';
import { Store } from '@ngrx/store';
import { clickNewCard } from '../../profile/+store/profile.actions';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.less'],
})
export class CardComponent {
    @Input() data: CardModel;

    constructor(private store: Store) {}

    onClick(card: CardModel) {
        alert('You successfully clicked to button');
        this.store.dispatch(clickNewCard({ card }));
    }
}
