/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditBankCardComponent } from './edit-bank-card.component';

describe('EditBankCardComponent', () => {
  let component: EditBankCardComponent;
  let fixture: ComponentFixture<EditBankCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBankCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBankCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
