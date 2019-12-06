import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Wallet } from 'src/app/data/models/wallet';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';

@Injectable()
export class InventoryWalletResolver implements Resolve<Wallet[]> {
    constructor(private inventoryService: InventoryService,
                private alertService: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Wallet[]> {
        return this.inventoryService.getInventoryWallets(route.params['userId']).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
