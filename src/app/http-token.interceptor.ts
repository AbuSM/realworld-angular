import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { getToken } from './utils';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor() {}
    private cache: Map<string, HttpResponse<any>> = new Map()

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const headersConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
        const token = getToken();
        if (token && !request.params.get('noToken')) {
            headersConfig['Authorization'] = `Token ${token}`;
        }
        let params = request.params.delete('noToken');
        const req = request.clone({ setHeaders: headersConfig, params });
        if (req.method === 'GET') {
            const { params, url } = req;
            const key = `${url}?${params.toString()}`;
            const cachedResponse = this.cache.get(key);
            if (cachedResponse) {
                return of(cachedResponse.clone());
            } else {
                return next.handle(req).pipe(
                    tap(value => {
                        if (value instanceof HttpResponse) {
                            this.cache.set(key, value)
                        }
                    })
                )
            }
        }
        return next.handle(req);
    }
}
