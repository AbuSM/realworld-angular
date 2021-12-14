import { Component, Input } from '@angular/core';
import { CardModel } from '../../models';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.less'],
})
export class CardComponent {
    @Input() data: CardModel;

    constructor() {}
}
