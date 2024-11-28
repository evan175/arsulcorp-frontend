import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild, HostListener } from '@angular/core';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';
import { CognitoService, User } from '../cognito.service';
import {MatMenuModule} from '@angular/material/menu';
import { Subscription } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatToolbar, MatButtonModule, RouterLink, MatMenuModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private cognitoService: CognitoService, private router: Router, private cdRef: ChangeDetectorRef) {}
  loggedIn = false;
  isAdmin = false
  userAtr: any = {}
  firstName = ''
  authSubscription: Subscription | undefined 

  async loadUser() {
    try {
      this.userAtr = await this.cognitoService.getCurrentUserAttributes()
      this.firstName = this.userAtr.name.split(' ')[0]

      const groups = await this.cognitoService.getUserGroups()
      this.isAdmin = groups.includes('Admins')
    } catch {
      this.isAdmin = false
    }
  }

  async ngOnInit() {
    this.authSubscription = this.cognitoService.currLoggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn
      this.loadUser()
    })

    try {
      let usr = await this.cognitoService.getCurrentUser()
      this.loggedIn = true
    } catch {
      this.loggedIn = false
    }

    this.cognitoService.isLoggedInSubject.next(this.loggedIn)
  }


  async onLogOut() {
    console.log('logging out...')
    this.cognitoService.signOut().then(() => {
      console.log('logged out')
      this.router.navigateByUrl('/home')
    }).catch((error) => console.log(error))
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
