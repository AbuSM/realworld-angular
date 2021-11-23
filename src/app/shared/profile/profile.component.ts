import { Component, Input } from '@angular/core';
import {formatDate} from "@angular/common";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less'],
})
export class ProfileComponent {
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
