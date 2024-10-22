import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { House } from '../listing-card/listing-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent {
  constructor(private http: HttpClient){}

  loading = true

  houses: House[] = []
  slicedHouses: House[] = []

  public async loadData() {
    const apiUrl = environment.apiUrl
    this.http.get(`${apiUrl}/houses`
    ).subscribe(res => {
      this.houses = res as House[]
      this.houses = this.houses
        .filter(house => house['featured'] == true)
        .map(house => ({
          ...house, 
          imgUrls: house['imgUrls'].slice(0, 1) || []
        }));
      this.slicedHouses = this.houses.slice(1)
    })    
  }

  public async ngOnInit() {
    await this.loadData()
    this.loading = false
  }
  
}
