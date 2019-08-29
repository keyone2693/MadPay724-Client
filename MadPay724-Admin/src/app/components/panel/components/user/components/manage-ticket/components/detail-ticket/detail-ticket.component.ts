import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { TicketContent } from 'src/app/models/ticketContent';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.css']
})
export class DetailTicketComponent implements OnInit , OnDestroy {
  ticket: Ticket;
  subManager = new Subscription();
  constructor(private route: ActivatedRoute, private title: Title) { }

  ngOnInit() {
    this.loadTickets();
    this.title.setTitle('مشاهده ی تیکت ' + this.ticket.title);
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
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
