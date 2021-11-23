import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-follow-button',
    templateUrl: './follow-button.component.html',
})
export class FollowButtonComponent implements OnInit {
    @Input() profile;

    constructor() {
    }

    ngOnInit(): void {
    }
    toggleFollow(){}

}
