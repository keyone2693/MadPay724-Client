/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EasypayAddComponent } from './easypay-add.component';

describe('EasypayAddComponent', () => {
  let component: EasypayAddComponent;
  let fixture: ComponentFixture<EasypayAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasypayAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasypayAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
