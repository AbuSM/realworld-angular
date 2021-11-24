import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { AuthGuardService } from '../services';

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
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditorRoutingModule {}
