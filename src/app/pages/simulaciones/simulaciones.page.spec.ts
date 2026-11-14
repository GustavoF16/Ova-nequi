import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { SimulacionesPage } from './simulaciones.page';

describe('SimulacionesPage', () => {
  let component: SimulacionesPage;
  let fixture: ComponentFixture<SimulacionesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SimulacionesPage],
      providers: [provideHttpClient(), provideRouter([])]
    });

    fixture = TestBed.createComponent(SimulacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
