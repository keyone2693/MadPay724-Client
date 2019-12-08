/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FactorService } from './factor.service';

describe('Service: Factor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactorService]
    });
  });

  it('should ...', inject([FactorService], (service: FactorService) => {
    expect(service).toBeTruthy();
  }));
});
