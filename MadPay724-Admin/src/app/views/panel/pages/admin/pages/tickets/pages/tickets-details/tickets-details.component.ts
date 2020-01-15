import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketsService } from 'src/app/core/_services/panel/admin/tickets.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/data/models/ticket';

import * as fromStore from 'src/app/store';
import { TicketContent } from 'src/app/data/models/ticketContent';

@Component({
  selector: 'app-tickets-details',
  templateUrl: './tickets-details.component.html',
  styleUrls: ['./tickets-details.component.css']
})
export class TicketsDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('closedchk', { static: false }) private closedck;
  ticket: Ticket;
  subManager = new Subscription();
  constructor(private route: ActivatedRoute, private title: Title, private ticketService: TicketsService,
    private alertService: ToastrService, private store: Store<fromStore.State>) { }

  ngOnInit() {
    this.loadTickets();
    this.title.setTitle('مشاهده ی تیکت ' + this.ticket.title);
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  onSetClosed() {
    this.ticketService.setTicketClosed(
      this.closedck.checked,
      this.ticket.id
    ).subscribe(() => {
      this.alertService.success('وضعیت تیکت با موفیت تغییر کرد', 'موفق');
      this.ticket.closed = this.closedck.checked;
      if (this.closedck.checked === true) {
        this.store.dispatch(new fromStore.DecUnClosedTicketCount());
      } else {
        this.store.dispatch(new fromStore.IncUnClosedTicketCount());
      }
    }, error => {
      this.alertService.error(error, 'خطا در تغییر وضعیت');
    });
  }
  loadTickets() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.ticket = data.ticket;
      })
    );
  }
  addToTicketContentList(ticketContent: TicketContent) {
    this.ticket.ticketContents.push(ticketContent);
  }
  gotoAdd() {
    $('html , body').animate({
      scrollTop: $('#btnAddTicketContent').offset().top + 20
    }, 500);
  }

}
