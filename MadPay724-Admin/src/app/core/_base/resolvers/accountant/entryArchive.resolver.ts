import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';
import { Inventory } from 'src/app/data/models/accountant/inventory';
import { Entry } from 'src/app/data/models/accountant/entry';
import { EntryService } from 'src/app/core/_services/panel/accountant/entry.service';


@Injectable()
export class EntryArchiveResolver implements Resolve<Entry[]> {
    pageNumber = 0;
    pageSize = 5;
    filter = '';
    sortHe = '';
    sortDir = '';
    constructor(private entryService: EntryService, private router: Router,
                private alertService: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Entry[]> {
        return this.entryService.getEntriesArchive(this.pageNumber, this.pageSize, this.filter, this.sortHe, this.sortDir).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
