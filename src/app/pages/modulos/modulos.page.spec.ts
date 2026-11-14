import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ModulosPage } from './modulos.page';

describe('ModulosPage', () => {
  let component: ModulosPage;
  let fixture: ComponentFixture<ModulosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModulosPage],
      providers: [provideHttpClient(), provideRouter([])]
    });

    fixture = TestBed.createComponent(ModulosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
