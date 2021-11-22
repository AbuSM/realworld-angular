import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'settings',
        loadChildren: () =>
            import('./settings/settings.module').then((m) => m.SettingsModule),
    },
    {
        path: '**',
        component: NotFoundPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
