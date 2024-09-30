import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';
import { DepartmentEmployeeRequest } from '../models/departmentEmployeeRequest';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/departments';  

  constructor(private http: HttpClient) {}

  getEmployeesByDepartment(departmentId: string,page: number, size: number,searchTerm?: string, sortField: string = 'id', sortOrder: number = 1): Observable<Employee[]> {
    const sortOrderString = sortOrder === 1 ? 'asc' : 'desc';
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortField', sortField)
      .set('sortOrder', sortOrderString);

      if (searchTerm) {
        params = params.set('searchTerm', searchTerm);
      }

      const requestBody: DepartmentEmployeeRequest = { departmentId, page, size };
    return this.http.post<any[]>(`${this.apiUrl}/employee-by-department`,{ departmentId }, { params });
  }
  addEmployee(id:string,employee: Employee): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/${id}`, employee); 
  }
  getEmployee(id: string): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employees`, id);
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
    return this.http.get<{ name: string }>(`${this.apiUrl}/dep/${id}`);
  }
  
}
