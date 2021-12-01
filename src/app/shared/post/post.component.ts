import { Component, Input } from '@angular/core';
import { ArticleModel } from '../../models';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.less'],
})
export class PostComponent {
    @Input() post: ArticleModel = {
        slug: '',
        title: '',
        favoritesCount: 0,
        description: '',
        body: '',
        tagList: [],
        favorited: false,
        author: {
            username: null,
            bio: '',
            image: '',
            following: false,
        },
    };

    constructor() {}
}
