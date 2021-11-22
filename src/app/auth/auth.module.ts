import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./+store/auth.effects";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        SharedModule,
        EffectsModule.forFeature([AuthEffects])
    ],
    declarations: [AuthComponent],
})
export class AuthModule {}
