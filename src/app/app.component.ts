import { Component, OnInit } from '@angular/core';
import { AuthService } from './services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
    title = 'realworld-angular';

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.checkUser();
    }
}
