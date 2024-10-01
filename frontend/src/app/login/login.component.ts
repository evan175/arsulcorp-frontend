import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { CognitoService, User, SignInUser } from '../cognito.service';
import { Router, RouterLink } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, RouterLink],
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

  async onLogin() {
    console.log('Logging in...')
    this.cognitoService.signIn(this.loginForm.value as SignInUser).then(async (res) => {
      console.log('logged in')
      this.router.navigateByUrl('home');
    }).catch((error) => {
      alert(error)
    })
    
    this.loginForm.reset()
  }
}
