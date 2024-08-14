/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestTAIComponent } from './test-tai.component';

describe('TestTAIComponent', () => {
  let component: TestTAIComponent;
  let fixture: ComponentFixture<TestTAIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTAIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
