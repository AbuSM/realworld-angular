import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileEffects } from './+store/profile.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { profileReducer } from './+store/profile.reducers';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        SharedModule,
        ProfileRoutingModule,
        StoreModule.forFeature('profile', profileReducer),
        EffectsModule.forFeature([ProfileEffects]),
    ],
})
export class ProfileModule {}
