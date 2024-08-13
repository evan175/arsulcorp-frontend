import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { CognitoService, User, SigningUser } from '../cognito.service';
import { Router } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private cognitoService: CognitoService, private router: Router){}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  hide = signal(true);
  clickHide() {
    this.hide.set(!this.hide());
  }

  onLogin() {
    console.log('Logging in...')
    this.cognitoService.signIn(this.loginForm.value as SigningUser).then(async (res) => {
      console.log('logged in')
      const tokens = await this.cognitoService.getTokens()
      const currUser = await this.cognitoService.getCurrentUser()
      this.cognitoService.currUser.set({email: currUser.email as string, name: currUser.name as string, access_token: tokens.tokens?.accessToken.toString() as string})
      this.router.navigateByUrl('home');
    }).catch((error) => {
      alert(error)
    }).finally(() => {
      this.loginForm.reset()
    })
  }
}
