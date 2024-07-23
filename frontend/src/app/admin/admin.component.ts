import { AfterViewInit, Component, signal, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements AfterViewInit{
  constructor(private http: HttpClient){}

  displayedColumns: string[] = ['id', 'firstName', 'middleName', 'lastName', 'email', 'number'];
  dataSource = new MatTableDataSource<Applicant>();
  private _filterStr = ''

  set filterStr(value: string) {
    this._filterStr = value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  loadData(){
    const apiUrl = environment.apiUrl
    this.http.get<Applicant[]>(`${apiUrl}/items`).subscribe(data => {
      console.log(data)
      const flattenedData = data.flat();
      this.dataSource.data = flattenedData;
    });
  }

  ngOnInit() {
    this.loadData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Applicant {
  id: string
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone_num: string;
}
