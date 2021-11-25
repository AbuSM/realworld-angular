import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleModel } from '../models';
import { ArticlesService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, Observable, startWith, Subscription } from 'rxjs';
import { getIsUser } from '../auth/+store/auth.selector';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.less'],
})
export class ArticleComponent implements OnInit, OnDestroy {
    commentErrors;
    comments;
    article: ArticleModel;
    canModify$: Observable<boolean>;
    isLoading: boolean = false;
    isModalOpen: boolean = false;
    errors = null;
    subscription: Subscription = new Subscription();

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
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    onDeleteArticle() {
        this.isLoading = true;
        this.subscription = this.articlesService
            .delete(this.article.slug)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe({
                next: () => this.router.navigateByUrl('/'),
                error: (err) => (this.errors = err),
            });
    }

    onToggleFollowing(event: Event) {}

    onToggleFavorite(event: Event) {}

    onDeleteComment() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
