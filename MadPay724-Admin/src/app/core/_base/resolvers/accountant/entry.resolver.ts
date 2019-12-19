import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntryService } from 'src/app/core/_services/panel/accountant/entry.service';
import { Entry } from 'src/app/data/models/accountant/entry';

@Injectable()
export class EntryResolver implements Resolve<Entry> {
    constructor(private inventoryService: EntryService,
                private alertService: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Entry> {
        return this.inventoryService.getEntry(route.params['entryId']).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
