import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '../shared';
import { ArticleResolverService } from './article-resolver.service';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from './+store/article.effects';
import { StoreModule } from '@ngrx/store';
import { articleReducer } from './+store/article.reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ArticleComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ArticleRoutingModule,
        SharedModule,
        StoreModule.forFeature('articles', articleReducer),
        EffectsModule.forFeature([ArticleEffects]),
    ],
    providers: [ArticleResolverService],
})
export class ArticleModule {}
