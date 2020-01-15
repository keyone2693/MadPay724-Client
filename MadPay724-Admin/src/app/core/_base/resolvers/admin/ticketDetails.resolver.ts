import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ticket } from 'src/app/data/models/ticket';
import { TicketsService } from 'src/app/core/_services/panel/admin/tickets.service';
@Injectable()
export class TicketDetailsResolver implements Resolve<Ticket> {
    constructor(private ticketService: TicketsService, private router: Router,
                private alertService: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Ticket> {
        return this.ticketService.getTicket(route.params['ticketId']).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
