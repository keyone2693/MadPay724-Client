/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BankCardService } from './bankcard.service';

describe('Service: Bankcard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankCardService]
    });
  });

  it('should ...', inject([BankCardService], (service: BankCardService) => {
    expect(service).toBeTruthy();
  }));
});
