import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'modulos',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/modulos/modulos.page').then( m => m.ModulosPage)
  },
  {
    path: 'enviar-dinero',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/enviar-dinero/enviar-dinero.page').then(m => m.EnviarDineroPage)
  },
  {
    path: 'recibir-pagos',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/recibir-pagos/recibir-pagos.page').then(m => m.RecibirPagosPage)
  },
  {
    path: 'pagar-servicios',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/pagar-servicios/pagar-servicios.page').then(m => m.PagarServiciosPage)
  },
  {
    path: 'simulaciones',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/simulaciones/simulaciones.page').then( m => m.SimulacionesPage)
  },
  {
    path: 'encuestas',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/encuestas/encuestas.page').then( m => m.EncuestasPage)
  },
  {
    path: 'configuracion',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/configuracion/configuracion.page').then( m => m.ConfiguracionPage)
  },
  {
    path: 'progreso',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/progreso/progreso.page').then( m => m.ProgresoPage)
  },
  {
    path: 'certificados',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/certificados/certificados.page').then( m => m.CertificadosPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  }
];
