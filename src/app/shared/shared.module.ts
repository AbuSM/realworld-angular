import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsListComponent, PostComponent, ProfileComponent } from './';
import { RouterModule } from '@angular/router';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { FollowButtonComponent } from './follow-button/follow-button.component';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ModalComponent } from './modal/modal.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';

@NgModule({
    declarations: [
        PostComponent,
        ProfileComponent,
        ErrorsListComponent,
        ArticleMetaComponent,
        FollowButtonComponent,
        FavoriteButtonComponent,
        ArticleCommentComponent,
        SpinnerComponent,
        ModalComponent,
        TabsComponent,
        TabComponent,
    ],
    imports: [CommonModule, RouterModule],
    exports: [
        PostComponent,
        ProfileComponent,
        ErrorsListComponent,
        ArticleMetaComponent,
        ArticleCommentComponent,
        FollowButtonComponent,
        FavoriteButtonComponent,
        SpinnerComponent,
        ModalComponent,
        TabsComponent,
        TabComponent,
    ],
})
export class SharedModule {}
