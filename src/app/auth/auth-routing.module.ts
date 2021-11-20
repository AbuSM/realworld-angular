import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
    {
        path: 'login',
        component: AuthComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: 'register',
        component: AuthComponent,
        canActivate: [AuthGuardService],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
