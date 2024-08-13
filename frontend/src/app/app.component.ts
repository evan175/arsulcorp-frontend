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
  constructor(public cognitoService: CognitoService) {}

  async ngOnInit() {
    try {
      let userAttr = await this.cognitoService.getCurrentUser()
      let token = localStorage.getItem('token')
      this.cognitoService.currUser.set({email: userAttr.email as string, name: userAttr.name as string, access_token: token as string})
    } catch (err) {
      console.log(err)
    }
    
  }
}
