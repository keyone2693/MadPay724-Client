/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EasyPayService } from './easyPay.service';

describe('Service: EasyPay', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EasyPayService]
    });
  });

  it('should ...', inject([EasyPayService], (service: EasyPayService) => {
    expect(service).toBeTruthy();
  }));
});
