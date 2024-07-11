import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatToolbarRow } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatToolbarRow, MatButtonModule, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
