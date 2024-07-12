import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [MatToolbarModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationComponent {
  readonly firstName = new FormControl('', [Validators.required]);
  readonly middleName = new FormControl('')
  readonly lastName = new FormControl('', [Validators.required]);
  readonly email = new FormControl('', [Validators.required, Validators.email])

  errorMessage = signal('');

  constructor() {
    merge(this.firstName.statusChanges, this.firstName.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.firstName.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else {
      this.errorMessage.set('');
    }
  }
}
