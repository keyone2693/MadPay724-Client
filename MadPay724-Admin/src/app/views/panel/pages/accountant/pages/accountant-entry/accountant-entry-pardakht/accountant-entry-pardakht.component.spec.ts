/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountantEntryPardakhtComponent } from './accountant-entry-pardakht.component';

describe('AccountantEntryPardakhtComponent', () => {
  let component: AccountantEntryPardakhtComponent;
  let fixture: ComponentFixture<AccountantEntryPardakhtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountantEntryPardakhtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantEntryPardakhtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
