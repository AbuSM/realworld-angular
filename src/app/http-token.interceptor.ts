import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { getToken } from './utils';

interface CacheType {
    resp: HttpResponse<any>;
    time?: number;
}

const CACHE_DELAY = 60;

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor() {}
    private cache: Map<string, CacheType> = new Map();

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
            if (
                cachedResponse &&
                CACHE_DELAY >
                    (new Date().getTime() - cachedResponse.time) / 1000
            ) {
                return of(cachedResponse.resp.clone());
            } else {
                return next.handle(req).pipe(
                    tap((resp) => {
                        if (resp instanceof HttpResponse) {
                            this.cache.set(key, {
                                resp,
                                time: new Date().getTime(),
                            });
                        }
                    })
                );
            }
        }
        return next.handle(req);
    }
}
