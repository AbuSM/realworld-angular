import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services';
import { UserModel, ProfileModel } from '../models';
import {Observable, startWith, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {getUserData} from "../auth/+store/auth.selector";

@Component({
    selector: 'app-profile-page',
    templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private userService: AuthService,
        private store: Store
    ) {}

    profile: ProfileModel;
    subscription: Subscription = new Subscription();
    currentUser: UserModel;
    user$: Observable<any>;
    isOwn: boolean = false;

    ngOnInit() {
        this.user$ = this.store.select(getUserData)
        this.subscription = this.user$.pipe(startWith({})).subscribe({
            next: ({username}) => this.isOwn = username === this.route.snapshot.params['username']
        })
    }

    onToggleFollowing(event: Event) {
        this.profile.following = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
