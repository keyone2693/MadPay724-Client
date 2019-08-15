import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TicketService } from 'src/app/Services/panel/user/ticket.service';
import { TicketContent } from 'src/app/models/ticketContent';
import { Ticket } from 'src/app/models/ticket';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.css']
})
export class DetailTicketComponent implements OnInit {
  ticket: Ticket;
  constructor(private route: ActivatedRoute, private ticketService: TicketService, private authService: AuthService) { }

  ngOnInit() {

    const ticketId = this.route.snapshot.paramMap.get('ticketId');

    this.ticketService.getTicket(this.authService.decodedToken.nameid, ticketId).subscribe((data) => {
      this.ticket = data;
    });
  }

}
