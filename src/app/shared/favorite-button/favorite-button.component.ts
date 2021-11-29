import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { onToggleFavorite } from '../../article/+store/article.actions';
import { ArticleModel } from '../../models';

@Component({
    selector: 'app-favorite-button',
    templateUrl: './favorite-button.component.html',
    styleUrls: ['./favorite-button.component.less'],
})
export class FavoriteButtonComponent {
    @Input() article: ArticleModel;
    constructor(private store: Store) {}

    toggleFavorite() {
        this.store.dispatch(
            onToggleFavorite({
                slug: this.article.slug,
                favorited: this.article.favorited,
            })
        );
    }
}
