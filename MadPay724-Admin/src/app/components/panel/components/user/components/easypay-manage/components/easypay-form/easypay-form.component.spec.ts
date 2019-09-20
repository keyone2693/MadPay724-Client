/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EasypayFormComponent } from './easypay-form.component';

describe('EasypayFormComponent', () => {
  let component: EasypayFormComponent;
  let fixture: ComponentFixture<EasypayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasypayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasypayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
