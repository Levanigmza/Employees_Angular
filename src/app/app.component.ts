import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Employee, EmployeesService } from './services/Employees.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { HttpErrorResponse ,} from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableModule, HttpClientModule, FormsModule, CommonModule, EmployeeAddComponent, EmployeeEditComponent, ButtonModule, ButtonGroupModule],
  providers: [HttpClient, EmployeesService ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'თანამშომლების  მართვა';

  Employee: Employee[] = [];

  editEmployeemode: boolean = false;
  addEmployeemode: boolean = false;
  deleteEmployeemode: boolean = false;

  SelecetedEmployee: any;
  Message : string | null = null;

  constructor(private employeeservice: EmployeesService) { }

  ngOnInit(): void {
    this.getemployees();
  }

  getemployees() {
    this.employeeservice.GetEmployees().subscribe(
      (data) => {
        this.Employee = data
      }
    )
  }
  SubmitDelete(){
    this.employeeservice.DeleteEmployee(this.SelecetedEmployee.person_ID).subscribe({
        next: (response: string) => {
          if (response === 'person has been deleted') {
            this.Message = "თანამშრომელი წარმატებით წაიშალა"

          } else {
            console.log('Unexpected response:', response);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 500) {
            this.Message  = 'სისტემური ხარვეზი, გთოვთ სცადოთ მოგვიანებით.';
          } else {
            this.Message  = err.error || 'An unexpected error occurred.';
          }
        }
      });
 
  }

  newEmployee() {
    this.addEmployeemode = true;
  }

  EditEmployee(emp: any): void {
    this.editEmployeemode = true;
    this.SelecetedEmployee = emp;
  }


  deleteEmployee(emp: any): void {
    this.Message =null;
    this.SelecetedEmployee = emp;
    this.deleteEmployeemode = true;
  }
  


  closedeleteEmployeepopup(){
    this.deleteEmployeemode = false;
    this.getemployees();
  }

  closeAddEmployeemode() {
    this.addEmployeemode = false;
    this.getemployees();

  }
  closeEditEmployeemode() {
    this.editEmployeemode = false;
    this.getemployees();
  }



}
