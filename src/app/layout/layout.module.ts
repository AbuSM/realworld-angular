import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/';
import { HeaderComponent } from './';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [HeaderComponent, FooterComponent],
})
export class LayoutModule {}
