import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsListComponent, PostComponent, ProfileComponent } from './';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [PostComponent, ProfileComponent, ErrorsListComponent],
    imports: [CommonModule, RouterModule],
    exports: [PostComponent, ProfileComponent, ErrorsListComponent],
})
export class SharedModule {}
