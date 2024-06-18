import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Employee {
    firstname: string;
    lastname: string;
    person_ID: number;
    age: number;
    proffesion: string;
    phoneNumber:string;
}


@Injectable({

    providedIn: 'root',

})
export class EmployeesService {

    private apiUrl = 'https://localhost:7281/api/Employee';

    constructor(private http: HttpClient) { }

    GetEmployees(): Observable<any> {
        const url = `${this.apiUrl}/getemployeeAll`;
        return this.http.get(url);
    }

    AddEmployee(employee: Employee): Observable<string> {
        const url = `${this.apiUrl}/add`;
        return this.http.post(url, employee, { responseType: 'text' });
    }

    updateEmployee(personId: number, employee: Employee): Observable<string> {
        const url = `${this.apiUrl}/update`;

        return this.http.post(`${url}/${personId}`, employee , { responseType: 'text' });
    }
    DeleteEmployee(employeeID: number): Observable<string> {
        const url = `${this.apiUrl}/delete`;
        return this.http.delete(`${url}/${employeeID}`,  { responseType: 'text' });
    }
    

}