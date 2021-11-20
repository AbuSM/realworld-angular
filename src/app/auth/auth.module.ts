import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        SharedModule,
    ],
    declarations: [AuthComponent],
    exports: [AuthComponent],
    providers: [AuthGuardService],
})
export class AuthModule {}
