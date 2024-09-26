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

  getEmployeesByDepartment(departmentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${departmentId}`);
  }
  addEmployee(id:string,employee: Employee): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/${id}`, employee); 
  }
  getEmployeeById(employeeId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/${employeeId}`);
  }

  updateEmployee(employeeId: string, employeeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${employeeId}`, employeeData);
  }

  createDepartementWithEmployee(department:Department):Observable<any>{
    return this.http.post(`${this.apiUrl}`,department,{ responseType: 'text' });
  }

  updateDepartment(employeeId: string, department: Department) {
    return this.http.put(`${this.apiUrl}/${department.id}`, department);
  }

  getDepartmentById(id: string) {
    return this.http.get(`${this.apiUrl}/departmentId${id}`);
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`); // Make sure the URL matches your API
  }
  getDepartmentName(id:string): Observable<{ name: string }> {
    console.log(this.http.get<string>(`${this.apiUrl}/dep/${id}`));
    return this.http.get<{ name: string }>(`${this.apiUrl}/dep/${id}`);
  }
  
}
