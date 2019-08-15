import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TicketService } from 'src/app/Services/panel/user/ticket.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import * as _ from 'lodash';
import { Ticket } from 'src/app/models/ticket';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit, OnDestroy {
  @Input() firstTickets;
  @ViewChild(NgScrollbar, {static: false}) ticketScrollbar: NgScrollbar;
  tickets = new BehaviorSubject<Ticket[]>([]);
  page = 1;
  finished = false;
  subManager = new Subscription();
  promiseSetBySomeAction: any;

  constructor(private ticketService: TicketService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.tickets.next(this.firstTickets);
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  onScroll() {
    this.getTickets(this.page);
  }
  private getTickets(pageCout: number) {
    this.promiseSetBySomeAction = new Promise((resolve, reject) => {
      if (this.finished) {
        return;
      }
      const currentTickets = this.tickets.getValue();
      this.subManager.add(
        this.ticketService.getTickets(this.authService.decodedToken.nameid, pageCout).subscribe((newTickets) => {
          if (newTickets.length === 0) {
            this.finished = true;
            return;
          }
          this.tickets.next(_.concat(currentTickets, newTickets));
          this.ticketScrollbar.update();
          this.page += 1;
        })
      );
    });
  }

}
