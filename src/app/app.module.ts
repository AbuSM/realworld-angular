import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './shared/post/post.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';

import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { CounterComponent } from './counter/counter.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
    declarations: [
        AppComponent,
        PostComponent,
        ProfileComponent,
        HeaderComponent,
        AuthComponent,
        MainComponent,
        CounterComponent,
        SettingsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ count: counterReducer }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
