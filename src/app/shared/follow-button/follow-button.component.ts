import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-follow-button',
    templateUrl: './follow-button.component.html',
})
export class FollowButtonComponent {
    @Input() profile;

    constructor() {}

    toggleFollow() {}
}
