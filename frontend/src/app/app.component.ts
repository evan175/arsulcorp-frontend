import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomeComponent, RouterLink, RouterLinkActive, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'frontend';
}
