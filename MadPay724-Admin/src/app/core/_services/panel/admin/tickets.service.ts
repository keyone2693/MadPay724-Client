import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/data/models/ticket';
import { TicketContent } from 'src/app/data/models/ticketContent';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/admin';
  constructor(private http: HttpClient) {
  }

  getTickets(page: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUrl + 'users/' + userId + '/tickets/page/' + page);
  }

  getTicket(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(this.baseUrl + 'users/' + userId + '/tickets/' + ticketId);
  }

  addTicket(ticket: any): Observable<Ticket> {
    return this.http.post<Ticket>(this.baseUrl + 'users/' + userId + '/tickets', ticket);
  }
  addTicketContent(ticketContent: any, id: string): Observable<TicketContent> {
    return this.http.post<TicketContent>(this.baseUrl + 'users/' + userId + '/tickets/' + id + '/ticketcontents', ticketContent);
  }

  setTicketClosed(closed: any, id: string) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/tickets/' + id, { closed });
  }
}
