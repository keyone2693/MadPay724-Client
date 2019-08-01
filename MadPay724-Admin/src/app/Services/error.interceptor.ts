import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private alertService: ToastrService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('success');
                }
            }), catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        // return throwError(error.error);
                        console.log('attemring refresh tiken ...');
                        this.handleHttpResponseError(req, next);
                    }
                    if (error.status === 401) {
                        this.authService.logout();
                        this.router.navigate(['/auth/login']);
                        this.alertService.warning('با موفقیت خارج شدید', 'موفق');
                    }
                    // error
                    const appError = error.headers.get('App-Error');
                    if (appError) {
                        return  throwError(appError);
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
            })
        );
    }

  private  handleHttpResponseError(requrst: HttpRequest<any>, next: HttpHandler) {
      if(!istok)
  }

}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
