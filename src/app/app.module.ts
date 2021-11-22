import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
    AuthService,
    ApiService,
    ArticlesService,
    AuthGuardService,
    TagsService,
} from './services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { EditorModule } from './editor/editor.module';
import { SharedModule } from './shared';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './auth/+store/auth.reducer';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [AppComponent, NotFoundPageComponent],
    imports: [
        EditorModule,
        SharedModule,
        AuthModule,
        LayoutModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot({ auth: authReducer }),
        EffectsModule.forRoot([]),
    ],
    providers: [
        AuthService,
        ApiService,
        ArticlesService,
        AuthGuardService,
        TagsService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
