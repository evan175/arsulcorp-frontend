import { Injectable, signal } from '@angular/core';
import { Amplify } from 'aws-amplify'
import { signUp, signIn, signOut, confirmSignIn, ConfirmSignInInput, getCurrentUser, fetchUserAttributes, fetchAuthSession, confirmSignUp, autoSignIn, resendSignUpCode } from 'aws-amplify/auth'
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

   async signUp(signUpUser: SignUpUser): Promise<any> {
      return await signUp({ 
        username: signUpUser.email,
        password: signUpUser.password,
        options: {
          userAttributes: {
            email: signUpUser.email,
            name: signUpUser.name,
            phone_number: signUpUser.number
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

   async signIn(signInUser: SignInUser): Promise<any> {
      return await signIn({
        username: signInUser.email, 
        password: signInUser.password,
      })
   }

   async confirmSignIn(res: string): Promise<any> {
      return await confirmSignIn({
        challengeResponse: res
      })
   }

   async confirmSignUp(email: String, code: String) {
      await confirmSignUp({
        username: email as string,
        confirmationCode: code as string
      })
   }

   async resendSignUpCode(email: string) {
      return await resendSignUpCode({username: email})
   }

   async getCurrentUser() {
      return await getCurrentUser()
   }

   async getCurrentUserAttributes() {
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

export interface SignUpUser {
  email: string;
  password: string;
  name: string;
  number: string;
}

export interface SignInUser {
  email: string;
  password: string;
}
