import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmenteditService {
  private apiUrl = 'http://localhost:8080/departments';  
  
  constructor(private http:HttpClient) { }

  addDepartment(deparment: Department): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/department`, deparment); 
  }
  updateDeparment(id:string,deparment:Department):Observable<any>{
    return this.http.put(`${this.apiUrl}/deparmart/${id}`,deparment);
  }
  getDeparmentById(id:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/departmentId/${id}`);
  }
}
