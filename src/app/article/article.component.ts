import {Component, OnInit} from '@angular/core';
import {ArticleModel} from "../models";
import {ArticlesService} from "../services";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.less']
})
export class ArticleComponent implements OnInit {
    commentErrors;
    comments;
    article: ArticleModel;


    constructor(
        private articlesService: ArticlesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.article = this.route.snapshot.data['article'].article;
    }

    onDeleteArticle() {

    }

    onToggleFollowing(event: Event) {

    }

    onToggleFavorite(event: Event) {

    }

    onDeleteComment() {}

}
