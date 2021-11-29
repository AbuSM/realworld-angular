import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentModel } from '../../models';

@Component({
    selector: 'app-article-comment',
    templateUrl: './article-comment.component.html',
    styleUrls: ['./article-comment.component.less'],
})
export class ArticleCommentComponent {
    @Input() comment: CommentModel;
    @Input() canModify: boolean;
    @Output() deleteComment: EventEmitter<number> = new EventEmitter<number>();
    constructor() {}

    deleteClicked(comment: CommentModel) {
        this.deleteComment.emit(comment.id);
    }
}
