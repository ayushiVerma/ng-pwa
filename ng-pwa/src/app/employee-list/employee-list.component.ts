import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeList: any;

  constructor(
    private http: HttpClient
  ) { 

  }

  ngOnInit(): void {
    this.http.get('http://dummy.restapiexample.com/api/v1/employees').subscribe((res : any) => {
      console.log(res);
      this.employeeList = res.data;
    }, (err: any) => {
      console.log('Error --->', err);
    });

  }

}
