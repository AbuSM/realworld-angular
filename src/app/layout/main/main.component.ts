import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../services';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
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
    tags: object[] = [];
    isLogged: boolean = true;

    constructor(private tagsService: TagsService) {}

    ngOnInit() {
        this.tagsService.fetchAll().subscribe({
            next: (tags) => (this.tags = tags),
        });
    }
}
