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
      try{
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
      } catch (err) {
        console.error(err)
        throw err;
      }
   }

   async signOut() {
      try {
        await signOut();
      } catch (err) {
        console.log(err)
        throw err;
      }
   }

   async signIn(signInUser: SignInUser): Promise<any> {
    try {
      return await signIn({
        username: signInUser.email, 
        password: signInUser.password,
      })
    } catch (err) {
      console.error(err)
      throw err;
    }
   }

   async confirmSignIn(res: string): Promise<any> {
      try {
        return await confirmSignIn({
          challengeResponse: res
        })
      } catch (err) {
        console.log(err)
        throw err;
      }
   }

   async confirmSignUp(email: String, code: String) {
      try {
          await confirmSignUp({
            username: email as string,
            confirmationCode: code as string
          })
      } catch (err) {
          console.error(err)
          throw err;
      }

   }

   async resendSignUpCode(email: string) {
      try {
        return await resendSignUpCode({username: email})
      } catch (err) {
        console.error(err)
        throw err; 
      }
   }

   async getCurrentUser() {
      try {
        return await getCurrentUser()
      } catch (err) {
        console.error(err)
        throw err;
      }

      
   }

   async getCurrentUserAttributes() {
      try {
        return await fetchUserAttributes()
      } catch (err) {
        console.error(err)
        throw err;
      }
      
   }

   async fetchSession() {
      try {
        await fetchAuthSession({ forceRefresh: true })
      } catch (err) {
        console.error(err)
        throw err
      }
   }

   async getIdToken() {
      try {
        const tokens = await fetchAuthSession({ forceRefresh: true })
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
