import { Component, OnInit, Input } from '@angular/core';
import { TicketContent } from 'src/app/models/ticketContent';

@Component({
  selector: 'app-chat-ticket',
  templateUrl: './chat-ticket.component.html',
  styleUrls: ['./chat-ticket.component.css']
})
export class ChatTicketComponent implements OnInit {
  @Input() ticketContents: TicketContent[];

  constructor() { }

  ngOnInit() {
  }

}
