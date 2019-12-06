/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InventoryService } from './Inventory.service';

describe('Service: Inventory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryService]
    });
  });

  it('should ...', inject([InventoryService], (service: InventoryService) => {
    expect(service).toBeTruthy();
  }));
});
