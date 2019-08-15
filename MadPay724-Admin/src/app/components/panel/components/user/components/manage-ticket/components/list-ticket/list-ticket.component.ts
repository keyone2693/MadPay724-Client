import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TicketService } from 'src/app/Services/panel/user/ticket.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import * as _ from 'lodash';
import { Ticket } from 'src/app/models/ticket';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit, OnDestroy {
  loaders: any;
  tickets = new BehaviorSubject<Ticket[]>([]);
  page = 1;
  finished = false;
  subManager = new Subscription();
  constructor(private ngxService: NgxUiLoaderService, private ticketService: TicketService,
              private authService: AuthService, private route: ActivatedRoute) {
    this.loaders = {
      pbColor: '#ff4444',
      bgsColor: '#ff4444',
      bgsPosition: POSITION.bottomCenter,
      bgsSize: 70,
      fgsPosition: POSITION.bottomCenter,
      fgsSize: 70,
      fgsColor: '#ff4444',
      bgsType: SPINNER.threeBounce,
      fgsType: SPINNER.threeBounce,
      pbDirection: PB_DIRECTION.rightToLeft,
      pbThickness: 3,
      overlayColor: 'rgba(40,40,40,0)'
    };
  }

  ngOnInit() {
    this.loadTickets();
    // this.ngxService.startLoader('loader-01');
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadTickets() {
    this.subManager.add(
      this.route.data.subscribe(data => {
          this.tickets.next(data.tickets);
      })
    );
  }
  onScroll() {
    this.getTickets(this.page);
  }
  private getTickets(pageCout: number) {
    if (this.finished) {
      return;
    }
    const currentTickets = this.tickets.getValue();
    this.subManager.add(
      this.ticketService.getTickets(this.authService.decodedToken.nameid, pageCout).subscribe((newTickets) => {
        if (!newTickets || newTickets.length) {
          this.finished = true;
          return;
        }
        this.tickets.next(_.concat(currentTickets, newTickets));
        this.page += 1;
      })
    );
  }

}
