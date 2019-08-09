/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WalletFormComponent } from './wallet-form.component';

describe('WalletFormComponent', () => {
  let component: WalletFormComponent;
  let fixture: ComponentFixture<WalletFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
