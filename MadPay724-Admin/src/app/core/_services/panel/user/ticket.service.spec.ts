/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TicketService } from './ticket.service';

describe('Service: Ticket', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketService]
    });
  });

  it('should ...', inject([TicketService], (service: TicketService) => {
    expect(service).toBeTruthy();
  }));
});
