/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EasypayEditComponent } from './easypay-edit.component';

describe('EasypayEditComponent', () => {
  let component: EasypayEditComponent;
  let fixture: ComponentFixture<EasypayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasypayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasypayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
