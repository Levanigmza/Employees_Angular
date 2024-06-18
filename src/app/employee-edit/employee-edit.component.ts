import { Component, EventEmitter, Output, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeesService, Employee } from '../services/Employees.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse ,} from '@angular/common/http';


@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [EmployeesService],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent implements OnInit {

  @Input() employee :any
  @Output() closeEditmode: EventEmitter<void> = new EventEmitter<void>();

  currentEmp:[];

  employeeForm!: FormGroup;
  errorMessage: string | null = null;
  PersonID :any | null = null;
  addEmployee: boolean = true;
  showSuccess: boolean = false;

  constructor(
    private formBuilder: FormBuilder,     private employeeService: EmployeesService,

  ) {
    this.currentEmp = this.employee;


    this.employeeForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      person_ID: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^\d+$/),]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(90)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^\d+$/),]],
      proffesion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });

  }


  ngOnInit(): void {
    console.log(this.employee)
    this.PersonID = this.employee.person_ID
  }



alert(){

}
onSubmit() {
  if (this.employeeForm.valid) {
    const newEmployee: Employee = this.employeeForm.value;
    this.employeeService.updateEmployee(this.PersonID, newEmployee).subscribe({
      next: (response: string) => {
        if (response === 'Employee successfully updated.') {
          this.employeeForm.reset();
          this.addEmployee = false;
          this.showSuccess = true;
        } else {
          console.log('Unexpected response:', response);
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 500) {
          this.errorMessage = 'სისტემური ხარვეზი, გთოვთ სცადოთ მოგვიანებით.';
        } else {
          this.errorMessage = err.error || 'An unexpected error occurred.';
        }
      }
    });
  } else {
    this.errorMessage = "გთხოვთ შეავსოთ ყველა ველი";
  }
}



  closepopup(){
    this.closeEditmode.emit();

  }
}

