/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WalletsGatesComponent } from './wallets-gates.component';

describe('WalletsGatesComponent', () => {
  let component: WalletsGatesComponent;
  let fixture: ComponentFixture<WalletsGatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletsGatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletsGatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
