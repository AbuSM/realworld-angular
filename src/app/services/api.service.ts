import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

/**
 * Common API Service used for making requests
 */

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) {}

    private static formatErrors(error: any) {
        return throwError(error.error);
    }

    get(path: string, config: {}): Observable<any> {
        return this.http
            .get(`${environment.api_url}${path}`, config)
            .pipe(catchError(ApiService.formatErrors));
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http
            .put(`${environment.api_url}${path}`, body)
            .pipe(catchError(ApiService.formatErrors));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http
            .post(`${environment.api_url}${path}`, body)
            .pipe(catchError(ApiService.formatErrors));
    }

    delete(path): Observable<any> {
        return this.http
            .delete(`${environment.api_url}${path}`)
            .pipe(catchError(ApiService.formatErrors));
    }
}
