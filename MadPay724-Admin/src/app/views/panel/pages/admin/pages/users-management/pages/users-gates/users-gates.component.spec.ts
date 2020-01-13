/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsersGatesComponent } from './users-gates.component';

describe('UsersGatesComponent', () => {
  let component: UsersGatesComponent;
  let fixture: ComponentFixture<UsersGatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersGatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersGatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
