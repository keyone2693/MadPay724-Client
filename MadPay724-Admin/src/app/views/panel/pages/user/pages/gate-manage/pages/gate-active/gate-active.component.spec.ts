/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GateActiveComponent } from './gate-active.component';

describe('GateActiveComponent', () => {
  let component: GateActiveComponent;
  let fixture: ComponentFixture<GateActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
