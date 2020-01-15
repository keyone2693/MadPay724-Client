import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/data/models/ticket';
import { TicketContent } from 'src/app/data/models/ticketContent';
import { TicketSearch } from 'src/app/data/models/admin/ticketSearch';
import { PaginationResult } from 'src/app/data/models/common/paginationResult';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/admin/';
  constructor(private http: HttpClient) {
  }
  getTickets(page?, itemPerPage?, filter?: TicketSearch, sortHe?, sortDir?):
    Observable<PaginationResult<Ticket[]>> {
    const paginatedResult: PaginationResult<Ticket[]> = new PaginationResult<Ticket[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter.filter);
      params = params.append('closed', filter.closed.toString());
      params = params.append('level', filter.level.toString());
      params = params.append('isAdminSide', filter.isAdminSide.toString());
      params = params.append('department', filter.department.toString());
      params = params.append('minDate', filter.minDate.toString());
      params = params.append('maxDate', filter.maxDate.toString());
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Ticket[]>
      (this.baseUrl + 'tickets',  { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getTicket(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(this.baseUrl + 'tickets/' + ticketId);
  }

  addTicketContent(ticketId: string,ticketContent: any ): Observable<TicketContent> {
    return this.http.post<TicketContent>(this.baseUrl + 'tickets/' + ticketId + '/ticketcontents', ticketContent);
  }

  setTicketClosed(ticketId: string,closed: any) {
    return this.http.put(this.baseUrl + 'tickets/' + ticketId, { closed });
  }
}
