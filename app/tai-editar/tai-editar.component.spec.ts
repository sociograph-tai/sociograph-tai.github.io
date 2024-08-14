import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiEditarComponent } from './tai-editar.component';

describe('TaiEditarComponent', () => {
  let component: TaiEditarComponent;
  let fixture: ComponentFixture<TaiEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaiEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
