import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { onToggleFollow } from '../../profile/+store/profile.actions';
import { ProfileModel } from '../../models';

@Component({
    selector: 'app-follow-button',
    templateUrl: './follow-button.component.html',
})
export class FollowButtonComponent {
    @Input() profile: ProfileModel;

    constructor(private store: Store) {}

    toggleFollow() {
        this.store.dispatch(onToggleFollow({ ...this.profile }));
        // this.profile.following = !this.profile.following;
    }
}
