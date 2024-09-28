import { Component } from '@angular/core';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CognitoService } from '../cognito.service';
import { House } from '../listing-card/listing-card.component';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [ListingCardComponent],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent {
  constructor(private http: HttpClient, private cognitoService: CognitoService){}

  s3Url = environment.s3Url
  apiUrl = environment.apiUrl
  houses: House[] = []

  async loadData(){
    this.http.get(`${this.apiUrl}/houses`
    ).subscribe(res => {
      this.houses = res as House[]
    })
  }

  //CONVERT houses.imgIds to imgUrls from env file s3url, using map maybe?

  ngOnInit() {
    this.loadData()
  }


}
