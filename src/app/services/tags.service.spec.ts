import { TestBed } from '@angular/core/testing';

import { TagsService } from './tags.service';
import {ApiService} from "./api.service";

describe('TagsService', () => {
    let service: TagsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ApiService]
        });
        service = TestBed.inject(TagsService);
    });

    // it('should be created', () => {
    //     expect(service).toBeTruthy();
    // });
});
