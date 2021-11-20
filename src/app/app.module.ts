import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthService, ApiService, ArticlesService } from './services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { EditorModule } from './editor/editor.module';
import { SharedModule } from './shared';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './auth/+store/auth.reducer';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
    declarations: [AppComponent, SettingsComponent, NotFoundPageComponent],
    imports: [
        AuthModule,
        EditorModule,
        SharedModule,
        LayoutModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot({ auth: authReducer }),
    ],
    providers: [AuthService, ApiService, ArticlesService],
    bootstrap: [AppComponent],
})
export class AppModule {}
