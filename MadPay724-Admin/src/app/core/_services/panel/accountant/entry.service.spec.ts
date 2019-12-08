/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EntryService } from './entry.service';

describe('Service: Entry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryService]
    });
  });

  it('should ...', inject([EntryService], (service: EntryService) => {
    expect(service).toBeTruthy();
  }));
});
