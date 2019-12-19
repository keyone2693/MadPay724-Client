import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/data/models/ticket';
import { TicketService } from 'src/app/core/_services/panel/user/ticket.service';
import { TicketContent } from 'src/app/data/models/ticketContent';
import * as fromStore from '../../../../../../../../store';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.css']
})
export class DetailTicketComponent implements OnInit, OnDestroy {
  @ViewChild('closedchk') private closedck;
  ticket: Ticket;
  subManager = new Subscription();
  constructor(private route: ActivatedRoute, private title: Title, private ticketService: TicketService,
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
      this.closedck.checked ,
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
