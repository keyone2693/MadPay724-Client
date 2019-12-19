/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountantFactorsReportComponent } from './accountant-factorsReport.component';

describe('AccountantFactorsReportComponent', () => {
  let component: AccountantFactorsReportComponent;
  let fixture: ComponentFixture<AccountantFactorsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountantFactorsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantFactorsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
