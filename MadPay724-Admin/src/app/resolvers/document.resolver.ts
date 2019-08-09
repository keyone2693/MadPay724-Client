import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../Services/auth/auth.service';
import { DocumentService } from '../Services/panel/user/document.service';

@Injectable()
export class DocumentResolver implements Resolve<Document[]> {
    constructor(private documentService: DocumentService, private router: Router,
                private alertService: ToastrService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Document[]> {
        return this.documentService.getDocuments(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertService.error('خطا دردریافت اطلاعات', 'خطا');
                // this.router.navigate([this.authService.getDashboardUrl()]);
                return of(null);
            })
        );
    }
}