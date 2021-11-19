import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {concatMap, tap} from 'rxjs/operators';
import {AuthService} from "../services";
import {UserModel, ProfileModel} from '../models';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile.component.html'
})
export class UserComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private userService: AuthService
    ) {
    }

    profile: ProfileModel;
    currentUser: UserModel;
    isUser: boolean;

    ngOnInit() {
        // this.route.data.pipe(
        //     concatMap((data: { profile: ProfileModel }) => {
        //         this.profile = data.profile;
        //         // Load the current user's data.
        //         return this.userService.currentUser.pipe(tap(
        //             (userData: UserModel) => {
        //                 this.currentUser = userData;
        //                 this.isUser = (this.currentUser.username === this.profile.username);
        //             }
        //         ));
        //     })
        // ).subscribe();
    }

    onToggleFollowing(following: boolean) {
        this.profile.following = following;
    }

}
