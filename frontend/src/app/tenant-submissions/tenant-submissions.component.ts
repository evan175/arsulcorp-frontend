import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-tenant-submissions',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule],
  templateUrl: './tenant-submissions.component.html',
  styleUrl: './tenant-submissions.component.css'
})
export class TenantSubmissionsComponent {

}
