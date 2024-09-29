import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CognitoService } from './cognito.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomeComponent, RouterLink, RouterLinkActive, HeaderComponent, FooterComponent]
})
export class AppComponent {
  constructor(private cognitoService: CognitoService) {}

  async ngOnInit() {
    try {
      await this.cognitoService.fetchSession()
      let userAttr = await this.cognitoService.getCurrentUserAttributes()
      let id_token = await this.cognitoService.getIdToken()
      this.cognitoService.currUser.set({email: userAttr.email as string, name: userAttr.name as string, id_token: id_token as string})
      console.log('User logged in')
    } catch (err) {
      console.log('User not logged in')
    }
    
  }
}
