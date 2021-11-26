import { Component, Input } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html',
    styleUrls: ['./profile-header.component.less'],
})
export class ProfileHeaderComponent {
    _date: string;
    @Input() username?: string = '';

    get date() {
        return this._date;
    }
    @Input()
    set date(date) {
        this._date = formatDate(date, 'MMMM d, y', 'en');
    }

    constructor() {}

    onClick() {}
}
