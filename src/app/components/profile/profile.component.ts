import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
    @Input() username?: string = '';
    @Input() date?: string = '';

    constructor() {
    }

    ngOnInit(): void {
    }

    // onType(event: Event){
    //     console.log(this.username);
    //     this.username = (<HTMLDataElement>event.target).value
    // }

    onClick() {

    }
}
