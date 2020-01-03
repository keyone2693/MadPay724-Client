/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FactorEditComponent } from './factor-edit.component';

describe('FactorEditComponent', () => {
  let component: FactorEditComponent;
  let fixture: ComponentFixture<FactorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
