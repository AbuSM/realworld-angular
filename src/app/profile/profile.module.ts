import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileEffects } from './+store/profile.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        SharedModule,
        ProfileRoutingModule,
        EffectsModule.forFeature([ProfileEffects]),
    ],
})
export class ProfileModule {}
