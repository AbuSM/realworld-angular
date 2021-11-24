import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared";

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        SharedModule,
        SettingsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class SettingsModule {}
