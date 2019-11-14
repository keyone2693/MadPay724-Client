/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EasypayManageComponent } from './easypay-manage.component';

describe('EasypayManageComponent', () => {
  let component: EasypayManageComponent;
  let fixture: ComponentFixture<EasypayManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasypayManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasypayManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
