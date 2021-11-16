import {Component, Input, OnInit} from '@angular/core';

interface Post {
    title?: string,
    description?: string,
    username?: string,
    date?: string,
    likesCount?: number
}

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {
    @Input() post: Post = {};

    constructor() {
    }

    ngOnInit(): void {
    }

}
