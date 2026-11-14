import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ProgresoPage } from './progreso.page';

describe('ProgresoPage', () => {
  let component: ProgresoPage;
  let fixture: ComponentFixture<ProgresoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProgresoPage],
      providers: [provideHttpClient(), provideRouter([])]
    });

    fixture = TestBed.createComponent(ProgresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
