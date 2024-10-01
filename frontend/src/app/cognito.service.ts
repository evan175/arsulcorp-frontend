import { Injectable, signal } from '@angular/core';
import { Amplify } from 'aws-amplify'
import { signUp, signIn, signOut, confirmSignIn, ConfirmSignInInput, getCurrentUser, fetchUserAttributes, fetchAuthSession, confirmSignUp, autoSignIn, resendSignUpCode } from 'aws-amplify/auth'
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

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
 
  isLoggedInSubject = new BehaviorSubject(false);
  currLoggedIn = this.isLoggedInSubject.asObservable();

  signUp(signUpUser: SignUpUser): Promise<any> {
    try{
      return signUp({ 
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
    } catch (err) {
      console.error(err)
      throw err;
    }
  }

  async signOut() {
    try {
      const res = await signOut();
      this.isLoggedInSubject.next(false);
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  async signIn(signInUser: SignInUser): Promise<any> {
    try {
      const res = await signIn({
        username: signInUser.email,
        password: signInUser.password,
      });
      this.isLoggedInSubject.next(true);
    } catch (err) {
      console.error(err)
      throw err;
    }
  }

  confirmSignIn(res: string): Promise<any> {
    try {
      return confirmSignIn({
        challengeResponse: res
      })
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  confirmSignUp(email: String, code: String): Promise<any> {
    try {
      return confirmSignUp({
        username: email as string,
        confirmationCode: code as string
      })
    } catch (err) {
      console.error(err)
      throw err;
    }
  }

  resendSignUpCode(email: string): Promise<any> {
    try {
      return resendSignUpCode({username: email})
    } catch (err) {
      console.error(err)
      throw err; 
    }
  }

  getCurrentUser(): Promise<any> {
    try {
      return getCurrentUser()
    } catch (err) {
      console.error(err)
      throw err;
    }      
  }

  getCurrentUserAttributes(): Promise<any> {
    try {
      return  fetchUserAttributes()
    } catch (err) {
      console.error(err)
      throw err;
    }
    
  }

  fetchSession(): Promise<any> {
    try {
        return fetchAuthSession({ forceRefresh: true })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getIdToken() {
    try {
      const tokens = await fetchAuthSession()
      return tokens.tokens?.idToken?.toString()
    } catch (err) {
      console.error(err);
      throw err;
    }
    
    
  }

  async getAccessToken() {
    try {
      const tokens = await fetchAuthSession()
      return tokens.tokens?.accessToken.toString()
    } catch (err) {
      console.error(err)
      throw err;
    }
  }

  async getUserGroups() {
    try {
      const tokens = await fetchAuthSession()
      return tokens.tokens?.accessToken.payload['cognito:groups'] as Array<string>
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

export interface User {
  email: string;
  name: string;
  id_token: string;
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
