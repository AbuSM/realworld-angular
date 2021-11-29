import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, SharedModule, HomeRoutingModule],
    exports: [HomeComponent],
})
export class HomeModule {}
