import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ticket } from 'src/app/data/models/ticket';
import { TicketContent } from 'src/app/data/models/ticketContent';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  constructor(private http: HttpClient) { }

  getTickets(id: string, page: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUrl + 'users/' + id + '/tickets/page/' + page);
  }

  getTicket(id: string, ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(this.baseUrl + 'users/' + id + '/tickets/' + ticketId);
  }

  addTicket(ticket: any, id: string): Observable<Ticket> {
    return this.http.post<Ticket>(this.baseUrl + 'users/' + id + '/tickets', ticket);
  }
  addTicketContent(ticketContent: any, userId: string, id: string): Observable<TicketContent> {
    return this.http.post<TicketContent>(this.baseUrl + 'users/' + userId + '/tickets/' + id + '/ticketcontents' , ticketContent);
  }

  setTicketClosed(closed: any, userId: string, id: string) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/tickets/' + id , {closed});
  }

}
