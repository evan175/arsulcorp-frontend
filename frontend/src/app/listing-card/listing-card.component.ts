import { Component, Input, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css'
})
export class ListingCardComponent {
  @Input() house: House = {} as House
  @Input() carouselId: string = ''
  imgUrls: string[] = []
  imgUrlsSliced: string [] = []

  ngOnInit() {
    this.imgUrls = this.house.imgUrls
    this.imgUrlsSliced = this.imgUrls.slice(1)
  }
}

export interface House {
  id: string,
  address: string,
  description: string,
  price: number
  imgUrls: string[]
}