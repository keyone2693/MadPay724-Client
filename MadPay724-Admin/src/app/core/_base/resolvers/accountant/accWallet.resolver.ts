import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Wallet } from 'src/app/data/models/wallet';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';

@Injectable()
export class AccWalletResolver implements Resolve<Wallet[]> {
    pageNumber = 0;
    pageSize = 5;
    filter = '';
    sortHe = '';
    sortDir = '';
    constructor(private inventoryService: InventoryService,
                private alertService: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Wallet[]> {
        return this.inventoryService.getWallets(this.pageNumber, this.pageSize, this.filter, this.sortHe, this.sortDir).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
