/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsersEasypaysComponent } from './users-easypays.component';

describe('UsersEasypaysComponent', () => {
  let component: UsersEasypaysComponent;
  let fixture: ComponentFixture<UsersEasypaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersEasypaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEasypaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
