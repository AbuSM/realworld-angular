import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { AuthGuardService } from '../services';
import { EditorResolverService } from './editor-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: EditorComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: ':slug',
        component: EditorComponent,
        canActivate: [AuthGuardService],
        resolve: {
            article: EditorResolverService,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditorRoutingModule {}
