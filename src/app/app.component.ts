import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent {
    title = 'realworld-angular';
    posts = [
        {
            title: 'test',
            description: 'asasa',
            likesCount: 2,
            username: 'Fattoh',
            date: 'November 16, 2021'
        },
        {
            title: 'test2',
            description: 'new post 2',
            username: 'Anton',
        }
    ]
}
