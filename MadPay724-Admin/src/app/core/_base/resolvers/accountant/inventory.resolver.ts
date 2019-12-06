import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';
import { Inventory } from 'src/app/data/models/accountant/inventory';


@Injectable()
export class InventoryResolver implements Resolve<Inventory[]> {
    pageNumber = 0;
    pageSize = 5;
    filter = '';
    sortHe = '';
    sortDir = '';
    constructor(private inventoryService: InventoryService, private router: Router,
                private alertService: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Inventory[]> {
        return this.inventoryService.getInventories(this.pageNumber, this.pageSize, this.filter, this.sortHe, this.sortDir).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                this.router.navigate(['/panel/accountant/inventory']);
                return of(null);
            })
        );
    }
}
