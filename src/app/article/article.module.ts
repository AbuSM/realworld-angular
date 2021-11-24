import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '../shared';
import { ArticleResolverService } from './article-resolver.service';

@NgModule({
    declarations: [ArticleComponent],
    imports: [CommonModule, ArticleRoutingModule, SharedModule],
    providers: [ArticleResolverService],
})
export class ArticleModule {}
