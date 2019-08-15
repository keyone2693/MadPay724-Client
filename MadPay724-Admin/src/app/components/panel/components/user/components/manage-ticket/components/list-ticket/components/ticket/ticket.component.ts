import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  @Input() ticket: Ticket;
  @Input() ticketId: string;
  @Output() selectedTicketId = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  onClick(ticketId: string) {
    this.selectedTicketId.emit(ticketId);
  }
}
