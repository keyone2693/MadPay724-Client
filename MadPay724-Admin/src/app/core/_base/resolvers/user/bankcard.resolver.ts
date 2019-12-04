import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BankCard } from 'src/app/data/models/bankcard';
import { BankCardsService } from 'src/app/core/_services/panel/user/bankCards.service';

@Injectable()
export class BankCardResolver implements Resolve<BankCard[]> {
    constructor(private cardService: BankCardsService, private router: Router,
                private alertService: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<BankCard[]> {
        return this.cardService.getBankCards().pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
