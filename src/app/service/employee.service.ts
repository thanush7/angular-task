import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/departments';  

  constructor(private http: HttpClient) {}

  getEmployeesByDepartment(departmentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${departmentId}`);
  }
  addEmployee(id:number,employee: Employee): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/${id}`, employee); 
  }
  getEmployeeById(employeeId: number): Observable<any> {
    return this.http.get<any>(`/api/employees/${employeeId}`);
  }

  updateEmployee(employeeId: number, employeeData: any): Observable<any> {
    return this.http.put(`/api/employees/${employeeId}`, employeeData);
  }

  createDepartementWithEmployee(department:Department):Observable<any>{
    return this.http.post(`${this.apiUrl}`,department);
  }


}
