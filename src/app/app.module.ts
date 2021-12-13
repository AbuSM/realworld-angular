import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './http-token.interceptor';
import {
    AuthService,
    ApiService,
    ArticlesService,
    AuthGuardService,
    TagsService,
    ProfileService,
} from './services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared';
import { HomeModule } from './home/home.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './auth/+store/auth.reducer';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { EffectsModule } from '@ngrx/effects';
import { ProfileModule } from './profile/profile.module';

@NgModule({
    declarations: [AppComponent, NotFoundPageComponent],
    imports: [
        BrowserModule,
        SharedModule,
        AuthModule,
        LayoutModule,
        HttpClientModule,
        AppRoutingModule,
        ProfileModule,
        StoreModule.forRoot({
            auth: authReducer,
        }),
        HomeModule,
        EffectsModule.forRoot([]),
    ],
    providers: [
        AuthService,
        ApiService,
        ArticlesService,
        AuthGuardService,
        TagsService,
        ProfileService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpTokenInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
