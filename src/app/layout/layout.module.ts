import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/';
import { HeaderComponent } from './';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [HeaderComponent],
})
export class LayoutModule {}
