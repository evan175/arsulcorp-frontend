import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent {
  houses = {} // {houseid: [imgid, ...], ...}

  
}
