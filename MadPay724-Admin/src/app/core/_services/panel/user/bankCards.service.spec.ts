/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BankCardsService } from './bankCards.service';

describe('Service: BankCards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankCardsService]
    });
  });

  it('should ...', inject([BankCardsService], (service: BankCardsService) => {
    expect(service).toBeTruthy();
  }));
});
