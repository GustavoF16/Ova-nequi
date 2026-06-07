import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulacionesPage } from './simulaciones.page';

describe('SimulacionesPage', () => {
  let component: SimulacionesPage;
  let fixture: ComponentFixture<SimulacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
