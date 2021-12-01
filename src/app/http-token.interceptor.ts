import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getToken } from './utils';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const headersConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
        const token = getToken();
        if (token && !request.params.has('noToken')) {
            headersConfig['Authorization'] = `Token ${token}`;
        }
        let params = request.params.delete('noToken');

        const req = request.clone({ setHeaders: headersConfig, params });
        return next.handle(req);
    }
}
