import { Injectable, signal } from '@angular/core';
import { Amplify } from 'aws-amplify'
import { signUp, signIn, signOut, confirmSignIn, ConfirmSignInInput, getCurrentUser, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth'
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: environment.cognito
      }
    })
   }

   currUser = signal<User | undefined | null>(undefined)

   async signUp(signing_user: SigningUser): Promise<any> {
      return await signUp({ //
        username: signing_user.email,
        password: signing_user.password,
        options: {
          userAttributes: {
            email: signing_user.email
          }
        }
      })
   }

   async signOut() {
      try {
        await signOut();
      } catch (err) {
        console.log(err)
      }
   }

   async signIn(signing_user: SigningUser): Promise<any> {
      return await signIn({
        username: signing_user.email, 
        password: signing_user.password,
      })
   }

   async confirmSignIn(res: string): Promise<any> {
      return await confirmSignIn({
        challengeResponse: res
      })
   }

   async getCurrentUser() {
      await getCurrentUser()
      return await fetchUserAttributes()
   }

   async getTokens() {
      return await fetchAuthSession()
   }
}

export interface User {
  email: string;
  name: string;
  access_token: string;
}

export interface SigningUser {
  email: string;
  password: string
}
