/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputMpComponent } from './input-mp.component';

describe('InputMpComponent', () => {
  let component: InputMpComponent;
  let fixture: ComponentFixture<InputMpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputMpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
