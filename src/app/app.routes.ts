import { Routes } from '@angular/router';

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
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'modulos',
    loadComponent: () => import('./pages/modulos/modulos.page').then( m => m.ModulosPage)
  },
  {
    path: 'enviar-dinero',
    loadComponent: () => import('./pages/enviar-dinero/enviar-dinero.page').then(m => m.EnviarDineroPage)
  },
  {
    path: 'simulaciones',
    loadComponent: () => import('./pages/simulaciones/simulaciones.page').then( m => m.SimulacionesPage)
  },
  {
    path: 'encuestas',
    loadComponent: () => import('./pages/encuestas/encuestas.page').then( m => m.EncuestasPage)
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./pages/configuracion/configuracion.page').then( m => m.ConfiguracionPage)
  },
  {
    path: 'progreso',
    loadComponent: () => import('./pages/progreso/progreso.page').then( m => m.ProgresoPage)
  },
  {
    path: 'certificados',
    loadComponent: () => import('./pages/certificados/certificados.page').then( m => m.CertificadosPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  }
];
