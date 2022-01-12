import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeList: any;

  constructor(
    private http: HttpClient,
    private swUpdate: SwUpdate
  ) { 
    this.updateClient();
  }

  ngOnInit(): void {
    this.http.get('http://dummy.restapiexample.com/api/v1/employees').subscribe((res : any) => {
      console.log(res);
      this.employeeList = res.data;
    }, (err: any) => {
      console.log('Error --->', err);
    });

  }

  updateClient(){
    if(!this.swUpdate.isEnabled){
      console.log('Not Enaled');
      return;
    }

    this.swUpdate.versionUpdates.subscribe(res =>{
      console.log(`Current `, res);
      if(confirm('Click OK to update app. New updates available!')){
        this.swUpdate.activateUpdate().then(
          () => location.reload()
        );
      }
    });

    this.swUpdate.activated.subscribe(res => {
      console.log('CUREENT>>>>', res);
    })
  }

}
