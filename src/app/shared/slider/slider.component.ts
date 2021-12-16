import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CardModel } from '../../models';
import { getCards } from '../../profile/+store/profile.selectors';
import { Store } from '@ngrx/store';

const CARD_WIDTH = 300;

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.less'],
})
export class SliderComponent implements OnInit, AfterViewInit {
    @ViewChild('cardsDiv') cardsDiv: ElementRef;
    cards$: Observable<CardModel[]>;
    disabled: 'left' | 'right' | 'none' = 'left';

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.cards$ = this.store.select(getCards);
    }

    leftClick() {
        const { scrollLeft } = this.cardsDiv.nativeElement;
        const left = scrollLeft - CARD_WIDTH;
        this.cardsDiv.nativeElement.scroll({
            left,
            behavior: 'smooth',
        });
        this.checkButtonsStatus(left);
    }

    rightClick() {
        const { scrollLeft } = this.cardsDiv.nativeElement;
        const left = scrollLeft + CARD_WIDTH;
        this.cardsDiv.nativeElement.scroll({
            left,
            behavior: 'smooth',
        });
        this.checkButtonsStatus(left);
    }

    checkButtonsStatus(left) {
        const { scrollWidth } = this.cardsDiv.nativeElement;
        if (scrollWidth / 2 < left + CARD_WIDTH) {
            this.disabled = 'right';
        } else if (left <= 0) {
            this.disabled = 'left';
        } else {
            this.disabled = 'none';
        }
    }

    ngAfterViewInit() {
        this.cardsDiv.nativeElement.focus();
    }
}
