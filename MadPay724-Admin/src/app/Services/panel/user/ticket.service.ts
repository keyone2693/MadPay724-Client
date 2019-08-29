import { Injectable } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
}
