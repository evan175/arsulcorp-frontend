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
import { switchMap } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule],
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css'
})
export class AddListingComponent {
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private cognitoService: CognitoService, private router: Router){}
  apiUrl = environment.testApiUrl;

  img_strs: any = []
  img_files: File[] = []

  loading = false

  listingForm = this.formBuilder.group({
    houseId: uuidv4(),
    address: ['', Validators.required],
    description: [''],
    price: [0, Validators.required],
    featured: [false],
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

  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        img.src = e.target.result;
  
        img.onload = () => {
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height *= maxWidth / width));
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width *= maxHeight / height));
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
  
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            } else {
              reject(new Error('Image resize failed.'));
            }
          }, 'image/jpeg', 0.7);
        };
      };
  
      reader.readAsDataURL(file);
    });
  }

  async uploadImg(img: File, id: string) {
    const params = {'imgId': id}
    const idToken = await this.cognitoService.getIdToken()
    const headers = {'Authorization' : idToken as string}
    const resizedImg = await this.resizeImage(img, 1024, 1024);
    
    return new Promise<void>((resolve, reject) => {
      this.http.get<string>(`${this.apiUrl}/imgs/img-url`, {
          params: params,
          headers: headers,
        })
        .pipe(switchMap((signedUrl) =>
            this.http.put(signedUrl, resizedImg, {
              headers: {
                'Content-Type': 'image/jpeg',
              },
            })
          )
        )
        .subscribe({
          next: () => {
            console.log('Uploaded img to S3');
            resolve();
          },
          error: (error) => {
            console.error('Error uploading image', error);
            reject(error);
          },
        });
    });
  }

  async onSubmit() {
    if(!this.listingForm.invalid) {
      this.loading = true
      const formData = this.listingForm.value
      const idToken = await this.cognitoService.getIdToken()
      const headers = {'Authorization' : idToken as string}
  
      this.http.put(`${this.apiUrl}/houses`, formData, { headers })
      .subscribe({
        next: async (res) => {
          console.log(res);
          const imgIds: string[] = this.listingForm.value.imgIds as string[];
          //concurrent image uploads
          await Promise.all(imgIds.map((id, i) => this.uploadImg(this.img_files[i], id)));
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          console.error('Error submitting form', error);
        }
      });
    }
  }
}
