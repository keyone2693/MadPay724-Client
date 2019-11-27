import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import* as userActions from '../actions/users.action';
import { switchMap, catchError, map } from 'rxjs/operators';
import { UserService } from 'src/app/core/_services/panel/user.service';
import { of } from 'rxjs';


@Injectable()
export class UsersEffects {
    constructor(private action$: Actions,private userService: UserService) { }
    
    @Effect()
    loadUsers$ = this.action$.pipe(ofType(userActions.LOAD_USERS))
        .pipe(
            switchMap(() => {
                return this.userService.getUsers().pipe(
                    map(users => new userActions.LoadUsersSuccess(users)),
                    catchError(error => of(new userActions.LoadUsersFail(error)))
                    );
            })
        );
}