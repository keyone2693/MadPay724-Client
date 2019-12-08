import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';
import { Inventory } from 'src/app/data/models/accountant/inventory';
import { FactorService } from 'src/app/core/_services/panel/accountant/factor.service';
import { Factor } from 'src/app/data/models/accountant/factor';


@Injectable()
export class FactorResolver implements Resolve<Factor[]> {
    pageNumber = 0;
    pageSize = 5;
    filter = '';
    sortHe = '';
    sortDir = '';
    constructor(private factorService: FactorService, private router: Router,
                private alertService: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Factor[]> {
        return this.factorService.getFactors(this.pageNumber, this.pageSize, this.filter, this.sortHe, this.sortDir).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
