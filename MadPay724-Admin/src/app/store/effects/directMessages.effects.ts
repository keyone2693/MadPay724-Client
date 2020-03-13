import { Effect, Actions, ofType, act } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { DirectMessageService } from 'src/app/core/_services/common/DirectMessage.service';
import * as directMessageActions from '../actions/directMessages.actions'
import { switchMap } from 'rxjs/operators';
import { DirectMessageSaveService } from 'src/app/core/_services/common/directMessageSave.service';


@Injectable()
export class DirectMessageEffects {
    constructor(private action$: Actions, private directMessageService: DirectMessageService
        , private dmSaveService: DirectMessageSaveService) { }

    @Effect()
    InitHub$: Observable<Action> = this.action$.pipe(
        ofType<directMessageActions.InitHub>
            (directMessageActions.DirectMessagesActionTypes.INIT_HUB),
        switchMap(() => {
            this.directMessageService.initHub();

            return of(new directMessageActions.InitHubSuccess())
        })
    )

    @Effect()
    sendDirectMessage$: Observable<Action> = this.action$.pipe(
        ofType<directMessageActions.SendDirectMessage>
            (directMessageActions.DirectMessagesActionTypes.SEND_DIRECT_MESSAGE),
        switchMap((action: directMessageActions.SendDirectMessage) => {
            var dt = new Date();
            this.directMessageService.sendDirectMessage(action.message, action.userId, dt);
            return of(new directMessageActions.SendDirectMessageComplete(action.message, action.userId, dt))
        })
    )

    @Effect()
    join$: Observable<Action> = this.action$.pipe(
        ofType<directMessageActions.Join>
            (directMessageActions.DirectMessagesActionTypes.JOIN),
        switchMap(() => {
            this.directMessageService.join();
            const mess = this.dmSaveService.loadMessages();
            return of(new directMessageActions.JoinSent(mess.directMessages))
        })
    )

    @Effect()
    leave$: Observable<Action> = this.action$.pipe(
        ofType<directMessageActions.Leave>
            (directMessageActions.DirectMessagesActionTypes.LEAVE),
        switchMap(() => {
            this.directMessageService.leave();
            return of(new directMessageActions.LeaveSent())
        })
    )
}