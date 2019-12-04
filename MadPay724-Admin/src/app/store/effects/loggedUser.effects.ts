import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/core/_services/panel/user.service';

import * as loggedUserActions from '../actions/loggedUser.actions'
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class LoggedUserEffects {
    constructor(private action$: Actions, private userService: UserService) { }
    
    @Effect()
    LoadLoggedUser$ = this.action$.pipe(ofType(loggedUserActions.LoggedUserActionTypes.LOADLOGGEDUSER))
        .pipe(
            switchMap(() => {
                return this.userService.getUser().pipe(
                    map(user => new loggedUserActions.LoadLoggedUserSuccess(user)),
                    catchError(error => of(new loggedUserActions.LoadLoggedUserFail(error)))
                );
            })
        );
}