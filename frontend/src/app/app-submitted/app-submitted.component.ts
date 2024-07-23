import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-app-submitted',
  standalone: true,
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './app-submitted.component.html',
  styleUrl: './app-submitted.component.css'
})
export class AppSubmittedComponent {

}
