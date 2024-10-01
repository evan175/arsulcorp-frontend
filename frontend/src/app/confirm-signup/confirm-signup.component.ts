import { Component, Input, NgModuleFactory } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormField, MatLabel, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CognitoService } from '../cognito.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-confirm-signup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './confirm-signup.component.html',
  styleUrl: './confirm-signup.component.css'
})
export class ConfirmSignupComponent {
  constructor(private route: ActivatedRoute, private router: Router, private cognitoService: CognitoService, private snackBar: MatSnackBar) {}

  code: string = '';

  email = ''
  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email') as string
  }

  async onSubmit() {
    if(this.code){
      console.log('Confirming sign up')
      await this.cognitoService.confirmSignUp(this.email, this.code).then(() => {
        console.log('Sign up confirmed')
        this.router.navigateByUrl('home')
      }).catch((error) => {
        alert(error)
      })
    }
  }

  async resendCode() {
    console.log("Resending Code")
    await this.cognitoService.resendSignUpCode(this.email).then(() => {
      console.log("Code resent to email")
      this.snackBar.open("Code resent to email", "Close")
    }).catch((error) => {
      alert(error)
    })
  }
}
