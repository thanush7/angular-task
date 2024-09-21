import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'http://localhost:8080/departments'; 

  constructor(private http: HttpClient) { }

  getEmployeesAndDepartment(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/whole`);
  }
}
