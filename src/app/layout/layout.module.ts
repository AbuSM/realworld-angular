import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/';
import { HeaderComponent, MainComponent } from './';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [HeaderComponent, MainComponent],
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [HeaderComponent, MainComponent],
})
export class LayoutModule {}