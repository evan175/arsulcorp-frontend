import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder, ɵInternalFormsSharedModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css'
})
export class AddListingComponent {
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private cognitoService: CognitoService, private router: Router){}
  apiUrl = environment.apiUrl

  img_strs: any = []
  img_files: File[] = []

  listingForm = this.formBuilder.group({
    houseId: uuidv4(),
    address: ['', Validators.required],
    description: [''],
    price: [0, Validators.required],
    imgIds: [[] as string[]]
  });

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement
    if(input.files) {
      const fileArray: File[] = Array.from(input.files);
      this.img_files = this.img_files.concat(fileArray)

      const updatedImgIds = [...(this.listingForm.value.imgIds || [])];
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.img_strs.push(e.target.result); // Base64 string for image preview

        };
        reader.readAsDataURL(file);

        const id = uuidv4();
        updatedImgIds.push(id);
      });

      this.listingForm.patchValue({imgIds: updatedImgIds})
    }
  }

  removeImg(index: number) {
    this.img_strs.splice(index, 1);
    this.img_files.splice(index, 1);
    const currentIds = this.listingForm.value.imgIds || [];
    currentIds.splice(index, 1);
    this.listingForm.patchValue({imgIds: currentIds})
  }

  uploadImg(img: File) {
    const apiUrl = environment.apiUrl
    
  }

  async onSubmit() {
    if(!this.listingForm.invalid) {
      const formData = this.listingForm.value
      const idToken = (await this.cognitoService.getTokens()).tokens?.idToken?.toString()
      const headers = {'Authorization' : idToken as string}
      this.http.put(`${this.apiUrl}/houses`, formData, {
        headers: headers
      }).subscribe(res => {
        console.log(res)
        this.router.navigateByUrl('home');
      });

    }
  }
}