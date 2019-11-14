import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/data/models/ticket';

@Component({
  selector: 'app-manage-ticket',
  templateUrl: './manage-ticket.component.html',
  styleUrls: ['./manage-ticket.component.css']
})
export class ManageTicketComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  tickets: Ticket[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadTickets();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadTickets() {
    this.subManager.add(
      this.route.data.subscribe(data => {
          this.tickets = data.tickets;
      })
    );
  }

}
