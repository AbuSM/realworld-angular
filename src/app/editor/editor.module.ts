import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditorComponent} from './editor.component';
import {EditorRoutingModule} from "./editor-routing.module";

@NgModule({
    declarations: [EditorComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, EditorRoutingModule],
})
export class EditorModule {
}
