import { Component } from '@angular/core';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { House } from '../listing-card/listing-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [ListingCardComponent],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent {
  constructor(private http: HttpClient, private router: Router){}

  s3Url = environment.s3Url
  apiUrl = environment.apiUrl;
  houses: House[] = [] // [{address: 'hdad', ..., imgUrls: ['adasdasd', 'asdasd']}, {...}]

  async loadData(){
    this.http.get(`${this.apiUrl}/houses`
    ).subscribe(res => {
      this.houses = res as House[]
    })
  }

  async ngOnInit() {
    await this.loadData()
  }

  navToListing(id: string) {
    this.router.navigate(['listing', id])
  }


}
