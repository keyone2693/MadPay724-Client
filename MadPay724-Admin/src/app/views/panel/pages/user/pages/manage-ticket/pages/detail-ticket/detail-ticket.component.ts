import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/data/models/ticket';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { TicketService } from 'src/app/core/_services/panel/user/ticket.service';
import { TicketContent } from 'src/app/data/models/ticketContent';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.css']
})
export class DetailTicketComponent implements OnInit, OnDestroy {
  @ViewChild('closedchk', {static: false}) private closedck;
  ticket: Ticket;
  subManager = new Subscription();
  constructor(private route: ActivatedRoute, private title: Title, private ticketService: TicketService,
              private authService: AuthService, private alertService: ToastrService) { }

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
      this.authService.decodedToken.nameid,
      this.ticket.id
    ).subscribe(() => {
      this.alertService.success('وضعیت تیکت با موفیت تغییر کرد', 'موفق');
      this.ticket.closed = this.closedck.checked;
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
