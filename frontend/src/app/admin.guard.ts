import { CanActivateFn } from '@angular/router';
import { CognitoService } from './cognito.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = async (route, state) => {
  const cognitoService = inject(CognitoService)
  const router = inject(Router)

  if(!(await cognitoService.fetchSession())) {
    router.navigateByUrl('home');
    return false
  }

  let userGroups = await cognitoService.getUserGroups()

  if(userGroups.includes('Admins')) {
    return true
  }

  router.navigateByUrl('home');
  return false
};

