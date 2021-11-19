import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorsListComponent, PostComponent, ProfileComponent} from "./";


@NgModule({
    declarations: [PostComponent, ProfileComponent, ErrorsListComponent],
    imports: [
        CommonModule,
    ],
    exports: [PostComponent, ProfileComponent, ErrorsListComponent]
})
export class SharedModule {
}
