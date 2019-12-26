import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Entry } from 'src/app/data/models/accountant/entry';
import { EntryService } from 'src/app/core/_services/panel/accountant/entry.service';


@Injectable()
export class BankCardEntryResolver implements Resolve<Entry[]> {
    pageNumber = 0;
    pageSize = 5;
    filter = '';
    sortHe = '';
    sortDir = '';
    constructor(private entryService: EntryService,
                private alertService: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Entry[]> {
        return this.entryService.getBankCardEntries(route.params['bankcardId'],this.pageNumber,
            this.pageSize,
            this.filter,
            this.sortHe,
            this.sortDir).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
