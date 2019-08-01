import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse,
    HTTP_INTERCEPTORS, HttpResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, switchMap, finalize, filter, take } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { ToastrService } from 'ngx-toastr';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private isTokenRefreshin = false;
    tokenSubject = new BehaviorSubject<string>(null);

    constructor(private authService: AuthService, private alertService: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.attachTokenToRequest(req)).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('success');
                }
            }), catchError((error): Observable<any> => {
                if (error instanceof HttpErrorResponse) {
                    if ((error as HttpErrorResponse).status === 401) {
                        if (error.error === '0x000keyvanx00') {
                            this.alertService.error('خطا در اعتبار سنجی خودکار', 'خطا');
                            return this.authService.logout() as any;
                        } else if (error.error === '1x111keyvanx11') {
                            return throwError('کاربری با این یوزر و پس وجود ندارد');
                        } else {
                            return this.handleHttpResponseError(req, next);
                        }
                    } else {
                        return this.handelError(error);
                    }
                }
            })
        );
    }

    private handleHttpResponseError(requrst: HttpRequest<any>, next: HttpHandler) {
        if (!this.isTokenRefreshin) {
            this.isTokenRefreshin = true;

            this.tokenSubject.next(null);
            return this.authService.getNewRefreshToken().pipe(
                switchMap((tokenResponse: any) => {
                    if (tokenResponse) {
                        this.tokenSubject.next(tokenResponse.token);
                        localStorage.setItem('token', tokenResponse.token);
                        //  localStorage.setItem('refreshToken', tokenResponse.refresh_token);
                        //  localStorage.setItem('user', JSON.stringify(tokenResponse.user));
                        return next.handle(this.attachTokenToRequest(requrst));
                    }
                }), catchError(err => {
                    return this.handelError(err);
                }), finalize(() => {
                    this.isTokenRefreshin = false;
                })
            );
        } else {
            this.isTokenRefreshin = false;
            return this.tokenSubject.pipe(filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.attachTokenToRequest(requrst));
                }));
        }
    }
    private attachTokenToRequest(request: HttpRequest<any>) {
        const token = localStorage.getItem('token');

        return request.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    }

    private handelError(error: HttpErrorResponse) {
        // error
        const appError = error.headers.get('App-Error');
        if (appError) {
            return throwError(appError);
        }
        // model state error
        const serverError = error.error.errors;
        let modelStateError = '';
        if (serverError && typeof serverError === 'object') {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateError += serverError[key] + '\n';
                }
            }
        }
        // my error
        let myError = '';
        const myserverError = error.error;
        if (myserverError && typeof myserverError === 'object') {
            if (myserverError.status === false) {
                myError = myserverError.message;
            }
        }

        return throwError(modelStateError || myError || myserverError || 'خطایی رخ داده است');
    }
}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
