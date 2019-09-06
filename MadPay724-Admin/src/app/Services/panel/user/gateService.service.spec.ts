/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GateServiceService } from './gateService.service';

describe('Service: GateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GateServiceService]
    });
  });

  it('should ...', inject([GateServiceService], (service: GateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
