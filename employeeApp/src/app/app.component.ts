import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Employee } from './employee.model';
import * as _ from 'lodash';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'employeeapp';
  employees: Array<Employee>;
  emp: Employee = new Employee();
  closeResult: string;

  constructor(
    private appService: AppService,
    private modalService: NgbModal
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

  deleteEmployee(index: number) {
    this.appService.deleteEmployee(index).subscribe(result => {
      this.getAllEmployees();
    });
  }

  updateEmployee(emp: Employee) {
    this.appService.updateEmpllyee(emp.id, emp).subscribe((result) => {
      // TODO - close modal
      this.getAllEmployees();
    }, (error) => {
      alert(error);
    });
  }

  open(content, emp) {
    this.emp = _.cloneDeep(emp);
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
