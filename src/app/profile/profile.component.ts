import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService, AuthService } from '../services';
import { UserModel, ProfileModel, ArticleModel } from '../models';
import { Observable, startWith, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getUserData } from '../auth/+store/auth.selector';

const USER_FEED_ACTIVE_TAB = 1;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private userService: AuthService,
        private articlesService: ArticlesService,
        private store: Store
    ) {}

    subscriptions: Subscription = new Subscription();
    currentUser: UserModel;
    username!: string;
    user: ProfileModel;
    user$: Observable<any>;
    articles: ArticleModel[] = [];
    noDataText: string = '';

    ngOnInit() {
        this.username = this.route.snapshot.params['username'];
        this.user$ = this.store.select(getUserData);
        this.subscriptions.add(
            this.user$.pipe(startWith({})).subscribe({
                next: (user) => (this.user = user),
            })
        );
    }

    onTabChange(activeTab: number | string) {
        let config: {};
        if (activeTab === USER_FEED_ACTIVE_TAB) {
            config = { author: this.username };
            this.noDataText = '';
        } else {
            this.noDataText = 'favorited';
            config = { favorited: this.username };
        }
        this.subscriptions.add(
            this.articlesService.query(config).subscribe({
                next: ({ articles }) => (this.articles = articles),
            })
        );
    }

    onToggleFollowing(event: Event) {
        this.user.following = !this.user.following;
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
