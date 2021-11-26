import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '../shared';
import { ArticleResolverService } from './article-resolver.service';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from './+store/article.effects';

@NgModule({
    declarations: [ArticleComponent],
    imports: [
        CommonModule,
        ArticleRoutingModule,
        SharedModule,
        EffectsModule.forFeature([ArticleEffects]),
    ],
    providers: [ArticleResolverService],
})
export class ArticleModule {}
