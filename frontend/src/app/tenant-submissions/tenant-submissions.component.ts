import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { PdfService } from '../pdf.service';
import { CognitoService } from '../cognito.service';
import { Applicant } from '../admin/admin.component';
import { environment } from '../../environments/environment';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tenant-submissions',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './tenant-submissions.component.html',
  styleUrl: './tenant-submissions.component.css'
})
export class TenantSubmissionsComponent {
  constructor(private http: HttpClient, private pdf: PdfService, private cognitoService: CognitoService){}

  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'email', 'number', 'houseAddress', 'dateSubmitted'];
  dataSource = new MatTableDataSource<Applicant>();
  private _filterStr = ''

  set filterStr(value: string) {
    this._filterStr = value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  async loadData(){
    const apiUrl = environment.apiUrl
    const idToken = await this.cognitoService.getIdToken()
    const headers = {'Authorization' : idToken as string}
    let userAttr = await this.cognitoService.getCurrentUserAttributes()
    const email = userAttr.email
    this.http.get<Applicant[]>(`${apiUrl}/items/${email}`, {
      headers: headers
    }).subscribe(data => {
      this.dataSource.data = data;
    });
    
  }

  public async ngOnInit() {
    await this.loadData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
