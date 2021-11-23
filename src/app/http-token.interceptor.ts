import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {getItem} from "./utils";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        const token = getItem();

        if (token) {
            headersConfig['Authorization'] = `Token ${token}`;
        }

        const req = request.clone({setHeaders: headersConfig});
        return next.handle(req);
    }
}
