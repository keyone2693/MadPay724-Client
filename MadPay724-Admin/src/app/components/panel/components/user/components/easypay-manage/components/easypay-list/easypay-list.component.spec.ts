/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EasypayListComponent } from './easypay-list.component';

describe('EasypayListComponent', () => {
  let component: EasypayListComponent;
  let fixture: ComponentFixture<EasypayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasypayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasypayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
