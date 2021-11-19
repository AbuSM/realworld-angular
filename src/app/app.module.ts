import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthService, ApiService } from './services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {LayoutModule} from "./layout/layout.module";
import { AuthModule } from './auth/auth.module';
import { EditorModule } from './editor/editor.module';
import { SharedModule } from "./shared/shared.module";
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { CounterComponent } from './counter/counter.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
    declarations: [
        AppComponent,
        CounterComponent,
        SettingsComponent,
    ],
    imports: [
        AuthModule,
        EditorModule,
        SharedModule,
        LayoutModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot({ count: counterReducer }),
    ],
    providers: [AuthService, ApiService],
    bootstrap: [AppComponent],
})
export class AppModule {}
