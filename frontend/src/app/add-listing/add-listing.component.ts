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


@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css'
})
export class AddListingComponent {
  constructor(private formBuilder: FormBuilder){}
  imgs: any = []

  applicationForm = this.formBuilder.group({
    id: uuidv4(),
    address: ['', Validators.required],
    description: [''],
    price: [0, Validators.required],
    imgs: [[] as File[]]
  });

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement
    if(input.files) {
      const fileArray: File[] = Array.from(input.files);
      const currentImages = this.applicationForm.value.imgs || [];
      const updatedImages = currentImages.concat(fileArray);
      this.applicationForm.patchValue({imgs: updatedImages})

      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imgs.push(e.target.result); // Base64 string for image preview
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImg(index: number) {
    this.imgs.splice(index, 1);

    const currentImages = this.applicationForm.value.imgs || [];
    currentImages.splice(index, 1);
    this.applicationForm.patchValue({ imgs: currentImages });
  }

  uploadImg(img: File) {
    const apiUrl = environment.apiUrl
    
  }

  onSubmit() {
    console.log(this.applicationForm.value)

  }
}
