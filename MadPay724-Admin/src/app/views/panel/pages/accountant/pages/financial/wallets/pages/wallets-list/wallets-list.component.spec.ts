/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountantWalletsListComponent } from './accountant-wallets-list.component';

describe('AccountantWalletsListComponent', () => {
  let component: AccountantWalletsListComponent;
  let fixture: ComponentFixture<AccountantWalletsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountantWalletsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantWalletsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
