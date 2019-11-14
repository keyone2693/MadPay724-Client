/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentService } from './document.service';

describe('Service: Document', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentService]
    });
  });

  it('should ...', inject([DocumentService], (service: DocumentService) => {
    expect(service).toBeTruthy();
  }));
});
