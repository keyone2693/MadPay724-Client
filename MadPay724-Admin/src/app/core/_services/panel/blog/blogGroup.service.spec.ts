/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BlogGroupService } from './blogGroup.service';

describe('Service: BlogGroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogGroupService]
    });
  });

  it('should ...', inject([BlogGroupService], (service: BlogGroupService) => {
    expect(service).toBeTruthy();
  }));
});
