import { Component } from '@angular/core';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';
import { CognitoService, User } from '../cognito.service';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatToolbar, MatButtonModule, RouterLink, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public cognitoService: CognitoService, private router: Router) {}
  isAdmin = false
  currUser: User | null | undefined = null

  async loadUser() {
    const groups = await this.cognitoService.getUserGroups()
    this.isAdmin = groups.includes('Admins')
    this.currUser = this.cognitoService.currUser()
  }

  async ngOnInit() {
    await this.loadUser()
  }

  onLogOut() {
    console.log('logging out...')
    this.cognitoService.signOut().then(() => {
      this.cognitoService.currUser.set(null)
      console.log('logged out')
      this.router.navigateByUrl('/home')
      
    }).catch((error) => console.log(error))
  }
}
