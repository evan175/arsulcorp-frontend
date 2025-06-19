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
import { CognitoService } from '../cognito.service';


@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, RouterLink],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient, private title: Title, private router: Router, private cognitoService: CognitoService) {}

  apiUrl = environment.apiUrl

  houseId = ''
  house: House = {} as House
  loggedIn = false;
  isAdmin = false

  async loadUserGroups() {
    try {
      const groups = await this.cognitoService.getUserGroups()
      this.isAdmin = groups.includes('Admins')
    } catch {
      this.isAdmin = false
    }
  }

  async ngOnInit() {
    this.houseId = this.route.snapshot.paramMap.get('id') as string
    
    this.http.get(`${this.apiUrl}/houses/${this.houseId}`
    ).subscribe({
      next: res => {
        this.house = res as House
        this.title.setTitle(this.house['address'])
      },
      error: err => console.error('error', err)
    });

    try {
      let usr = await this.cognitoService.getCurrentUser()
      this.loggedIn = true
      await this.loadUserGroups()
    } catch {
      this.loggedIn = false
    }
  }

  navToApply(address: string) {
    this.router.navigate(['apply', address])
  }

  async deleteListing(id: string) {
    const idToken = await this.cognitoService.getIdToken()
    const headers = {'Authorization' : idToken as string}

    this.http.delete(`${this.apiUrl}/houses/${this.houseId}`, {
        headers: headers,
      }
    ).subscribe(res => {
      this.router.navigate(['home'])
    })
  }

}
