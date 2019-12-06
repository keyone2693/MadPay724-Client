import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BankCard } from 'src/app/data/models/bankcard';
import { BankCardsService } from 'src/app/core/_services/panel/user/bankCards.service';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';

@Injectable()
export class InventoryBankCardResolver implements Resolve<BankCard[]> {
    constructor(private inventoryService: InventoryService, private router: Router,
                private alertService: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<BankCard[]> {
        return this.inventoryService.getInventoryBankCards(route.params['userId']).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
