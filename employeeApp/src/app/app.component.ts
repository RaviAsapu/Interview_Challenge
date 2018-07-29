import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Employee } from './employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'employeeApp';
  employees: Array<Employee>;
  employee: Employee = new Employee();

  constructor(
    private appService: AppService,
  ) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  addEmployee(emp: Employee) {
    this.appService.addEmployee(emp).subscribe(result => {
      this.getAllEmployees();
    });
  }

  getAllEmployees() {
    this.appService.getAllEmployees().subscribe(employees => {
      console.log('employees : ', employees);
      this.employees = employees;
    });
  }

  deleteEmployee(emp: Employee, index: number) {
    this.appService.deleteEmployee(index).subscribe(result => {
      this.getAllEmployees();
    });
  }


}
