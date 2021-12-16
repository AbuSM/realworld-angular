import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService, AuthService } from '../services';
import { UserModel, ProfileModel, CardModel } from '../models';
import { Observable, of, startWith, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getUserData } from '../auth/+store/auth.selector';
import { fetchArticles } from '../article/+store/article.actions';
import { getAllArticles } from '../article/+store/article.selectors';
import { fetchCards } from './+store/profile.actions';
import { getCards } from './+store/profile.selectors';

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
    articles$: Observable<ReturnType<typeof getAllArticles>> = of({
        isLoading: false,
        articles: [],
    });
    noDataText: string = '';

    ngOnInit() {
        this.username = this.route.snapshot.params['username'];
        this.user$ = this.store.select(getUserData);
        this.subscriptions.add(
            this.user$.pipe(startWith({})).subscribe({
                next: (user) => (this.user = user),
            })
        );
        this.store.dispatch(fetchCards());
        this.articles$.pipe(startWith({ isLoading: false, articles: [] }));
        this.onTabChange(1);
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
        this.store.dispatch(fetchArticles({ config }));
        this.articles$ = this.store.select(getAllArticles);
    }

    onToggleFollowing() {
        this.user.following = !this.user.following;
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
