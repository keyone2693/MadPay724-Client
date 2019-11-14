/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GateManageComponent } from './gate-manage.component';

describe('GateManageComponent', () => {
  let component: GateManageComponent;
  let fixture: ComponentFixture<GateManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
