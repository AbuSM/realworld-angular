import {Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, OnDestroy} from '@angular/core';
import {ArticleModel} from '../models';
import {ArticlesService} from '../services';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {finalize, Observable, startWith, Subscription} from 'rxjs';
import {getIsUser} from "../auth/+store/auth.selector";

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
    errors = null;
    subscription: Subscription = new Subscription();
    @ViewChild('modal_confirm') modalConfirm: TemplateRef<any>;
    @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

    backdrop: any;

    constructor(
        private articlesService: ArticlesService,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store
    ) {
    }

    ngOnInit(): void {
        this.article = this.route.snapshot.data['article'].article;
        this.canModify$ = this.store.select(getIsUser(this.article.author.username))
            .pipe(startWith(false));
    }

    openModal() {
        let view = this.modalConfirm.createEmbeddedView(null);
        this.vc.insert(view);
        this.modalConfirm.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
        this.modalConfirm.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
        this.modalConfirm.elementRef.nativeElement.previousElementSibling.style.display = 'block';
        this.backdrop = document.createElement('DIV');
        this.backdrop.className = 'modal-backdrop';
        document.body.appendChild(this.backdrop)
    }

    closeModal() {
        this.vc.clear()
        document.body.removeChild(this.backdrop)
    }

    onDeleteArticle() {
        this.isLoading = true;
        this.subscription = this.articlesService.delete(this.article.slug).pipe(
            finalize(() => {
                this.closeModal();
                this.isLoading = false
            })
        ).subscribe({
            next: () => this.router.navigateByUrl('/'),
            error: (err) => this.errors = err
        })
    }

    onToggleFollowing(event: Event) {
    }

    onToggleFavorite(event: Event) {
    }

    onDeleteComment() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
