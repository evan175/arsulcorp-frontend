import { CanActivateFn } from '@angular/router';
import { CognitoService } from './cognito.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = async (route, state) => {
  const cognitoService = inject(CognitoService)
  const router = inject(Router)

  if(cognitoService.currUser() == null || cognitoService.currUser() == undefined) {
    router.navigateByUrl('home');
    return false
  }

  let userSession = await cognitoService.getTokens()
  let userGroups = userSession.tokens?.accessToken.payload['cognito:groups'] as Array<string>

  if(userGroups.includes('Admins')) {
    return true
  }

  router.navigateByUrl('home');
  return false
};

