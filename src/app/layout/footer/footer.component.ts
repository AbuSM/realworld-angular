import { Component } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    constructor() {}

    date: number = Date.now();
}
