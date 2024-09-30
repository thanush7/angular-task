import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadserviceService {

  private apiUrl = 'http://localhost:8080/departments';

  constructor(private http: HttpClient) {}

  uploadJsonFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.apiUrl}/upload-json`, formData, {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    });
  }
}
