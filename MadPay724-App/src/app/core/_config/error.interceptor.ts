import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse,
    HTTP_INTERCEPTORS, HttpResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, switchMap, finalize, filter, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    tokenSubject = new BehaviorSubject<string>(null);

    constructor(private alertService: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
            }), catchError((error): Observable<any> => {
                if (error instanceof HttpErrorResponse) {
                    return this.handelError(error);
                }
            })
        );
    }

    private handelError(error: HttpErrorResponse) {
        // error
        if (error.status === 403) {
            return throwError(' برای دسترسی به این بخش باید مدارک شما ارسال و تایید شده باشد '
                + ' برای بررسی مدارک به '
                + ' صفحه ارسال '
                + ' مراجعه کنید !!! ');
        }
        const appError = error.headers.get('App-Error');
        if (appError) {
            var objj = JSON.parse(appError);
            return throwError(objj.Message);
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
