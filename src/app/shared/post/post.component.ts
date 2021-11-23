import { Component, Input } from '@angular/core';
import {ArticleModel} from "../../models";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.less'],
})
export class PostComponent {
    @Input() post: ArticleModel;

    constructor() {}
}
