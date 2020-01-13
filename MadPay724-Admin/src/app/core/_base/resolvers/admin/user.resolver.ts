import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';
import { Inventory } from 'src/app/data/models/accountant/inventory';
import { UsersService } from 'src/app/core/_services/panel/admin/users.service';


@Injectable()
export class UserResolver implements Resolve<Inventory[]> {
    pageNumber = 0;
    pageSize = 5;
    filter = '';
    sortHe = '';
    sortDir = '';
    constructor(private usersService: UsersService, private router: Router,
                private alertService: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Inventory[]> {
        return this.usersService.getUsers(this.pageNumber, this.pageSize, this.filter, this.sortHe, this.sortDir).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
