import { HttpClient, HttpParams } from '@angular/common/http';
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

  getEmployees(searchTerm: string, page: number, size: number, sortBy: string, direction: string): Observable<any> {
    const params = {
      page: page,
      size: size,
      sortBy: sortBy,
      direction: direction,
      searchTerm: searchTerm
    };
      return this.http.post<any>(`${this.apiUrl}/allDepartment`, params, {
        headers: { 'Content-Type': 'application/json' }
      });
  }
  deleteDepartment(id: string): Observable<any> {

    return this.http.delete(`${this.apiUrl}/department/${id}`); // Make sure the URL matches your API
  }
}
