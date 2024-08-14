/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaiListarComponent } from './tai-listar.component';

describe('TaiListarComponent', () => {
  let component: TaiListarComponent;
  let fixture: ComponentFixture<TaiListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaiListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
