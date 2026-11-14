import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { CertificadosPage } from './certificados.page';

describe('CertificadosPage', () => {
  let component: CertificadosPage;
  let fixture: ComponentFixture<CertificadosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CertificadosPage],
      providers: [provideHttpClient(), provideRouter([])]
    });

    fixture = TestBed.createComponent(CertificadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
