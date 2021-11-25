import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services';
import { UserModel, ProfileModel } from '../models';
import { Observable, startWith, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getUserData } from '../auth/+store/auth.selector';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private userService: AuthService,
        private store: Store
    ) {}

    subscription: Subscription = new Subscription();
    currentUser: UserModel;
    username!: string;
    user: ProfileModel;
    user$: Observable<any>;

    ngOnInit() {
        this.username = this.route.snapshot.params['username'];
        this.user$ = this.store.select(getUserData);
        this.subscription = this.user$.pipe(startWith({})).subscribe({
            next: (user) => (this.user = user),
        });
    }

    onToggleFollowing(event: Event) {
        this.user.following = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
