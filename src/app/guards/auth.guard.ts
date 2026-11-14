import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = async () => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const login = await storageService.loadLogin();

  return login ? true : router.createUrlTree(['/login']);
};
