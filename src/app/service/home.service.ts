import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';
import { EmployeeRequest } from '../models/employeeRequest.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:8080/departments'; 

  constructor(private http: HttpClient) { }

  getEmployees(page: number, size: number): Observable<Department[]> {
    const requestBody: EmployeeRequest = {page, size };
    return this.http.post<any[]>(`${this.apiUrl}/allDepartment`,requestBody);
  }
  deleteDepartment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/department/${id}`); // Make sure the URL matches your API
  }
}
