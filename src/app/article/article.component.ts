import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { finalize, Observable, startWith, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ArticleModel, CommentModel, ErrorsModel } from '../models';
import { ArticlesService } from '../services';
import { getIsLogged, getIsUser } from '../auth/+store/auth.selector';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.less'],
})
export class ArticleComponent implements OnInit, OnDestroy {
    comments: CommentModel[];
    article: ArticleModel;
    canModify$: Observable<boolean>;
    commentControl = new FormControl();
    isLogged$: Observable<boolean>;
    isLoading: boolean = false;
    isModalOpen: boolean = false;
    errors: ErrorsModel = { errors: null };
    subscriptions: Subscription = new Subscription();

    constructor(
        private articlesService: ArticlesService,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.article = this.route.snapshot.data['article'].article;
        this.canModify$ = this.store
            .select(getIsUser(this.article.author.username))
            .pipe(startWith(false));
        this.isLogged$ = this.store.select(getIsLogged).pipe(startWith(false));
        this.subscriptions.add(
            this.articlesService.getComments(this.article.slug).subscribe({
                next: ({ comments }) => (this.comments = comments),
                error: (err) => (this.errors = err),
            })
        );
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

    onToggleFollowing(event: Event) {}

    onToggleFavorite(event: Event) {}

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
