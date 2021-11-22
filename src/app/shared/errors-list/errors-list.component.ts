import { Component, Input } from '@angular/core';
import { ErrorsModel } from '../../models';

@Component({
    selector: 'app-errors-list',
    templateUrl: './errors-list.component.html',
    styleUrls: ['./errors-list.component.less'],
})
export class ErrorsListComponent {
    errorList = [];

    constructor() {}

    @Input()
    set errors(errList: ErrorsModel) {
        this.errorList = Object.keys(errList.errors || {}).map(
            (key) => `${key} ${errList.errors[key]}`
        );
    }

    get errList() {
        return this.errorList;
    }
}
