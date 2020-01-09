/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GatesComponent } from './gates.component';

describe('GatesComponent', () => {
  let component: GatesComponent;
  let fixture: ComponentFixture<GatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
