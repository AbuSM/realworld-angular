import { Component, Input } from '@angular/core';
import { Post } from './post.model';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.less'],
})
export class PostComponent {
    @Input() post: Post = new Post('', '');

    constructor() {}
}
