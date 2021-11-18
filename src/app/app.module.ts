import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService, ApiService } from './services';
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
import { EditorComponent } from './editor/editor.component';

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
        EditorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot({ count: counterReducer }),
    ],
    providers: [AuthService, ApiService],
    bootstrap: [AppComponent],
})
export class AppModule {}
