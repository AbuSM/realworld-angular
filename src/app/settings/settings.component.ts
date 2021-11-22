import { Component } from '@angular/core';
import { AuthService } from '../services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.less'],
})
export class SettingsComponent {
    constructor(private router: Router, private authService: AuthService) {}

    logout() {
        this.authService.logout();
        this.router.navigateByUrl('/');
    }
}
