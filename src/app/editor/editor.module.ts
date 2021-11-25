import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { SharedModule } from '../shared';
import {EditorResolverService} from "./editor-resolver.service";

@NgModule({
    declarations: [EditorComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EditorRoutingModule,
        SharedModule,
    ],
    exports: [EditorComponent],
    providers: [EditorResolverService]
})
export class EditorModule {}
