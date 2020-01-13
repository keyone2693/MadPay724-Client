import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersService } from 'src/app/core/_services/panel/admin/users.service';
import { Role } from 'src/app/data/models/admin/role';

@Injectable()
export class UserRolesResolver implements Resolve<Role[]> {
    constructor(private usersService: UsersService,
                private alertService: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Role[]> {
        return this.usersService.getUserRoles(route.params['userId']).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
