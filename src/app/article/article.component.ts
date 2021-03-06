import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { finalize, Observable, of, startWith, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
    ArticleModel,
    CommentModel,
    ErrorsModel,
    ProfileModel,
} from '../models';
import { ArticlesService, ProfileService } from '../services';
import { getIsLogged, getIsUser } from '../auth/+store/auth.selector';
import { getProfile } from '../profile/+store/profile.selectors';
import { fetchProfile } from '../profile/+store/profile.actions';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.less'],
})
export class ArticleComponent implements OnInit, OnDestroy {
    comments: CommentModel[];
    article: ArticleModel;
    canModify$: Observable<boolean> = of(false);
    commentControl = new FormControl();
    isLogged$: Observable<boolean> = of(false);
    isLoading: boolean = false;
    isModalOpen: boolean = false;
    errors: ErrorsModel = { errors: null };
    subscriptions: Subscription = new Subscription();
    profile$: Observable<{ profile: ProfileModel }> = of({
        profile: {} as ProfileModel,
    });

    constructor(
        private articlesService: ArticlesService,
        private profileService: ProfileService,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.article = this.route.snapshot.data['article'].article;
        this.canModify$ = this.store.select(
            getIsUser(this.article.author.username)
        );
        this.isLogged$ = this.store.select(getIsLogged);
        this.subscriptions.add(
            this.articlesService.getComments(this.article.slug).subscribe({
                next: ({ comments }) => (this.comments = comments),
                error: (err) => (this.errors = err),
            })
        );
        this.store.dispatch(
            fetchProfile({ username: this.article.author.username })
        );
        this.profile$ = this.store.select(getProfile);
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    onDeleteArticle() {
        this.isLoading = true;
        this.subscriptions.add(
            this.articlesService
                .delete(this.article.slug)
                .pipe(finalize(() => (this.isLoading = false)))
                .subscribe({
                    next: () => this.router.navigateByUrl('/'),
                    error: (err) => (this.errors = err),
                })
        );
    }

    onCommentSubmit() {
        this.subscriptions.add(
            this.articlesService
                .addComment(this.article.slug, this.commentControl.value)
                .subscribe({
                    next: ({ comment }) => {
                        this.comments.push(comment);
                        this.commentControl.reset('');
                    },
                    error: (err) => (this.errors = err),
                })
        );
    }

    onDeleteComment(id: number) {
        this.subscriptions.add(
            this.articlesService
                .deleteComment(this.article.slug, id)
                .subscribe({
                    next: () => {
                        this.comments = this.comments.filter(
                            (comment) => comment.id !== id
                        );
                    },
                    error: (err) => (this.errors = err),
                })
        );
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
