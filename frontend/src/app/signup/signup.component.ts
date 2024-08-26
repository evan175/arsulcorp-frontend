import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CognitoService, SignUpUser } from '../cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private cognitoService: CognitoService, private router: Router){}

  signUpForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    middleName: [''],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.passwordValidator]],
    confirmPassword: ['', [Validators.required]],
    number: ['', [Validators.required]],
  }, { validators: this.passwordMatch });

  passwordValidator(passwordControl: AbstractControl) {
    const password = passwordControl.value

    if (!password){
      return null
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>_\-`~+=[\]\\]/.test(password);
    const isValidLength = password.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialCharacter && isValidLength;

    return passwordValid ? null : {passwordInvalid: true}
  }

  passwordMatch(control: AbstractControl){
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : {passwordMismatch: true};
  }

  hide = signal(true);
  confirmHide = signal(true);
  clickHide() {
    this.hide.set(!this.hide());
  }

  clickConfirmHide() {
    this.confirmHide.set(!this.confirmHide())
  }

  async onSignUp(){
    if(!this.signUpForm.invalid){
      console.log('Signing up...')
      let name = this.signUpForm.get('firstName')?.value?.trim() + ' ' + this.signUpForm.get('middleName')?.value?.trim() + ' ' + this.signUpForm.get('lastName')?.value?.trim()
      await this.cognitoService.signUp({
        email: this.signUpForm.get('email')?.value as string,
        password: this.signUpForm.get('password')?.value as string,
        name: name,
        number: this.signUpForm.get('number')?.value as string
      }).then((res) =>{
        console.log('Initiated sign Up. Now must confirm sign up')

        this.router.navigate(['confirm-signup', this.signUpForm.get('email')?.value])
      }).catch((err) => {
        alert(err)
      })
    }
  }
}
