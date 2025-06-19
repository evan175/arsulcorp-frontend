import { Component, ChangeDetectionStrategy, signal, Injectable } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { House } from '../listing-card/listing-card.component';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, RouterLink, MatSelectModule, MatProgressSpinnerModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Injectable({providedIn: 'root'})
export class ApplicationComponent {
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  apiUrl = environment.testApiUrl;

  loading = false

  applicationForm = this.formBuilder.group({
    id: uuidv4(),
    firstName: ['', Validators.required],
    middleName: [''],
    lastName: ['', Validators.required],
    number: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    houseAddress: ['', [Validators.required]],
    dateSubmitted: ['']
  });

  houses: House[] = [] as House[]
  selectedAddress: string | null = ''

  ngOnInit() {
    this.http.get<{ statusCode: number; headers: any; body: string }>(`${this.apiUrl}/houses`
    ).subscribe(res => {
      this.houses = JSON.parse(res.body) as House[]
    })

    this.selectedAddress = this.route.snapshot.paramMap.get('address')
    this.applicationForm.get('houseAddress')?.setValue(this.selectedAddress)
  }

  onSubmit(){
    if(!this.applicationForm.invalid){
      this.loading = true
      let date = new Date()
      let formattedDate = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
      this.applicationForm.get('dateSubmitted')?.setValue(formattedDate)
      const formData = this.applicationForm.value
      this.http.put(`${this.apiUrl}/items`, formData).subscribe(res => {
        console.log(res)
        this.router.navigateByUrl('app-submitted');
      });
    }
  }
  
}
