import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiResultadosComponent } from './tai-resultados.component';

describe('TaiResultadosComponent', () => {
  let component: TaiResultadosComponent;
  let fixture: ComponentFixture<TaiResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaiResultadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
