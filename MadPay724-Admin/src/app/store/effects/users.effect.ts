import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as userActions from '../actions/users.action';
import { switchMap, catchError, map, delay, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/_services/panel/user.service';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { User } from 'src/app/data/models/user';

@Injectable()
export class UsersEffects {
    constructor(private action$: Actions, private userService: UserService) { }

    @Effect()
    loadUsers$ = this.action$.pipe(ofType(userActions.LOAD_USERS))
        .pipe(
            switchMap(() => {
                return this.userService.smGetUsers().pipe(
                    map(users => new userActions.LoadUsersSuccess(users)),
                    catchError(error => of(new userActions.LoadUsersFail(error)))
                );
            })
        );
    @Effect()
    loadUser$ = this.action$.pipe(ofType(userActions.LOAD_USER))
            .pipe(
                map((action: userActions.LoadUser) => action.payload),
                mergeMap((id: string) => {
                    return this.userService.smGetUser(id).pipe(
                        map((user: User) => new userActions.LoadUserSuccess(user)),
                    catchError(error => of(new userActions.LoadUserFail(error)))
                );
            })
        );
    @Effect()
    CreateUser$ = this.action$.pipe(ofType(userActions.CREATE_USER))
            .pipe(
            map((action: userActions.CreateUser) => action.payload),
            mergeMap((user: User) => {
                return this.userService.smCreateUser(user).pipe(
                    map((newuser: User) => new userActions.CreateUserSuccess(newuser)),
                    catchError(error => of(new userActions.CreateUserFail(error)))
                );
            })
    );
    @Effect()
    UpdateUser$ = this.action$.pipe(ofType(userActions.UPDATE_USER))
        .pipe(
            map((action: userActions.UpdateUser) => action.payload),
            mergeMap((user: User) => {
                return this.userService.smUpdateUser(user).pipe(
                    map((updatedUser: User) => new userActions.UpdateUserSuccess({
                        id: updatedUser.id,
                        changes: updatedUser
                    })),
                    catchError(error => of(new userActions.UpdateUserFail(error)))
                );
            })
    );
    @Effect()
    DeleteUser$ = this.action$.pipe(ofType(userActions.DELETE_USER))
        .pipe(
            map((action: userActions.DeleteUser) => action.payload),
            mergeMap((id: string) => {
                return this.userService.smDeleteUser(id).pipe(
                    map(() => new userActions.DeleteUserSuccess(id)),
                    catchError(error => of(new userActions.DeleteUserFail(error)))
                );
            })
        );



}