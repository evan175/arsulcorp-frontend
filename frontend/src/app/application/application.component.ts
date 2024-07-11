import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent {

}
