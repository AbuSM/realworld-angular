import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'settings',
        component: SettingsComponent,
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
