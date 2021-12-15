import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cards } from '../../stubs';
import { of } from 'rxjs';
import { clickNewCard } from '../../profile/+store/profile.actions';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    let mockStore: MockStore;
    const initialState = {
        isLoading: false,
        cards,
    };
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CardComponent],
            providers: [Store, MockStore, provideMockStore({ initialState })],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        component.data = cards[0];
        mockStore = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('check default', () => {
        const el: HTMLDivElement = fixture.debugElement.query(
            By.css('.card')
        ).nativeElement;
        const cardImg = el.querySelector('.card-img-top');
        const cardTitle: HTMLHeadingElement = el.querySelector('h5.card-title');
        const cardText: HTMLDivElement = el.querySelector(
            '.card-body > div.card-text'
        );
        expect(cardImg).toBeDefined();
        expect(cardTitle.firstChild.textContent.trim()).toBe(cards[0].title);
        expect(cardTitle.querySelector('span')).toBeDefined();
        expect(cardText.querySelector('small').innerText).toBe(
            `${cards[0].time} min read`
        );
    });

    it('check `click` method', (done: DoneFn) => {
        spyOn(window, 'alert');
        spyOn(mockStore, 'dispatch').and.callFake(
            (action: ReturnType<typeof clickNewCard>) => {
                const card = action.card;
                initialState.cards = initialState.cards.map((oldCard) => {
                    return oldCard.id === card.id
                        ? {
                              ...card,
                              isNew: false,
                          }
                        : oldCard;
                });
                return of(initialState);
            }
        );
        expect(component.data.isNew).toBeTruthy();
        component.onClick(cards[0]);
        expect(window.alert).toHaveBeenCalledWith('You successfully clicked to button');
        component.data = initialState.cards[0];
        fixture.detectChanges();
        fixture.whenStable();
        expect(component.data.isNew).toBeFalsy();
        done();
    });
});
