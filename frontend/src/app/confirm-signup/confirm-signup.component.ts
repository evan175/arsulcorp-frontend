import { Component, Input, NgModuleFactory } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { confirmSignUp, autoSignIn } from 'aws-amplify/auth';
import {FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormField, MatLabel, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-confirm-signup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './confirm-signup.component.html',
  styleUrl: './confirm-signup.component.css'
})
export class ConfirmSignupComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  code: string = '';

  email = ''
  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email') as string
  }

  async onSubmit() {
    console.log(this.code)
    if(this.code){
      console.log('Confirming sign up')
      await confirmSignUp({
        username: this.email,
        confirmationCode: this.code as string
      }).then(async () => {
        await autoSignIn().catch((error) => console.log(error))
        console.log('Sign up confirmed')
        this.router.navigateByUrl('home')
      }).catch((error) => {
        alert(error)
      })
    }
  }
}
