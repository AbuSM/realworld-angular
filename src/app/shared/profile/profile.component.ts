import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less'],
})
export class ProfileComponent {
    @Input() username?: string = '';
    @Input() date?: string = '';

    constructor() {}

    onClick() {}
}
