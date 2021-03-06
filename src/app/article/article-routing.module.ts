import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticleResolverService } from './article-resolver.service';

const routes: Routes = [
    {
        path: ':slug',
        component: ArticleComponent,
        resolve: {
            article: ArticleResolverService,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ArticleRoutingModule {}
