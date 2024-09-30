import { Component, Input } from '@angular/core';
import { House } from '../listing-card/listing-card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, RouterLink],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient, private title: Title, private router: Router) {}

  houseId = ''
  house: House = {} as House
  ngOnInit() {
    this.houseId = this.route.snapshot.paramMap.get('id') as string
    const apiUrl = environment.apiUrl
    this.http.get(`${apiUrl}/houses/${this.houseId}`
    ).subscribe(res => {
      this.house = res as House
      this.title.setTitle(this.house['address'])
    })
  }

  navToApply(address: string) {
    this.router.navigate(['apply', address])
  }

}
