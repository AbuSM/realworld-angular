import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services';
import { UserModel, ProfileModel } from '../models';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile.component.html',
})
export class UserComponent {
    constructor(
        private route: ActivatedRoute,
        private userService: AuthService
    ) {}

    profile: ProfileModel;
    currentUser: UserModel;
    isUser: boolean;

    onToggleFollowing(following: boolean) {
        this.profile.following = following;
    }
}
