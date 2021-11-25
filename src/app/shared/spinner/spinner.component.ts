import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-spinner',
    template: `
        <ng-container *ngIf="loading">
            <div [ngClass]="{'spinner-border': loading}" class="spinner-border-{{type}}"></div>
        </ng-container>
    `,
})
export class SpinnerComponent {

    @Input() loading: boolean = false;
    @Input() type: string | 'sm' | 'md' | 'lg' = 'sm';

    constructor() {}

}
