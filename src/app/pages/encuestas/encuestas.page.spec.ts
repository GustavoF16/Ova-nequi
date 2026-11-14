import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { EncuestasPage } from './encuestas.page';

describe('EncuestasPage', () => {
  let component: EncuestasPage;
  let fixture: ComponentFixture<EncuestasPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EncuestasPage],
      providers: [provideHttpClient(), provideRouter([])]
    });

    fixture = TestBed.createComponent(EncuestasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
