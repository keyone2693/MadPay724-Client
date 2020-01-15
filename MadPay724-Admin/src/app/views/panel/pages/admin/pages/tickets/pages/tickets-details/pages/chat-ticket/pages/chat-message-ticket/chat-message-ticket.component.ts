import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { TicketContent } from 'src/app/data/models/ticketContent';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../../../../../../../../../store';

@Component({
  selector: 'app-chat-message-ticket',
  templateUrl: './chat-message-ticket.component.html',
  styleUrls: ['./chat-message-ticket.component.css']
})
export class ChatMessageTicketComponent implements OnInit, OnDestroy {
  @Input() ticketContent: TicketContent;
  photoUrl$: Observable<string>;
  constructor(public authService: AuthService,
    private store: Store<fromStore.State>) { }

  ngOnInit() {
    this.photoUrl$ = this.store.select(fromStore.getLoggedUserPhotoUrl);
  }
  ngOnDestroy() {
  }

}
