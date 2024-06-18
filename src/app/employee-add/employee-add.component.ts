import { Component, EventEmitter, Output, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeesService, Employee } from '../services/Employees.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse , HttpResponse} from '@angular/common/http';


@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [EmployeesService],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent implements OnInit {

  @Output() closeAddmode: EventEmitter<void> = new EventEmitter<void>();


  employeeForm!: FormGroup;
  errorMessage: string | null = null;
  addEmployee: boolean = true;
  showSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeesService
  ) {

  }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      person_ID: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^\d+$/),]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(90)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^\d+$/),]],
      proffesion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });
  }


  closepopup() {
    this.closeAddmode.emit();
  }
  alert(){
    this.errorMessage = ''
  }

  onSubmit() {
    if (this.employeeForm.valid) {
        const newEmployee: Employee = this.employeeForm.value;
        this.employeeService.AddEmployee(newEmployee).subscribe({
            next: (response: string) => {
                console.log(response);
                if (response === 'Employee successfully added.') {
                    this.employeeForm.reset();
                    this.addEmployee = false;
                    this.showSuccess = true;
                }
            },
            error: (err: HttpErrorResponse) => {
                if (err.status === 409) {
                    this.errorMessage = 'პირადი ნომერი უკვე რეგისტრირებულია.';
                } else if (err.status === 500) {
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



}
