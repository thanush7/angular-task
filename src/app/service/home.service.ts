import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:8080/departments'; 

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/allDepartment`);
  }
  
}
