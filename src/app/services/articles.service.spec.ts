import { TestBed } from '@angular/core/testing';

import { ArticlesService } from './articles.service';
import {ApiService} from "./api.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { cold, initTestScheduler } from 'jasmine-marbles';
import {article} from '../stubs';
import {of} from "rxjs";

xdescribe('ArticlesService', () => {
    let service: ArticlesService;
    let serviceSpy: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ArticlesService, ApiService]
        });
        service = TestBed.inject(ArticlesService);
        serviceSpy = jasmine.createSpy('ArticlesService');
        spyOn(service, 'query').and.returnValue(of({articles: [article]}));
        initTestScheduler();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('check service with marble', () => {
        const expectedObservable$ = cold('--a', {
            a: {article}
        });
        expect(service.query).toBeObservable(expectedObservable$);
    })
});
