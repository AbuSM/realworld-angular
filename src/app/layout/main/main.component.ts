import { Component } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
})
export class MainComponent {
    posts = [
        {
            title: 'test',
            description: 'asasa',
            likesCount: 2,
            username: 'Fattoh',
            date: 'November 16, 2021',
        },
        {
            title: 'test2',
            description: 'new post 2',
            username: 'Anton',
        },
    ];

    isLogged: boolean = true;

    constructor() {}
}
