import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminStats {
  students: number;
  teachers: number;
  parents: number;
  classes: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/admin';

  getStats(): Observable<AdminStats> {

    const token =
      localStorage.getItem('auth_token') ||
      sessionStorage.getItem('auth_token');

    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    return this.http.get<AdminStats>(
      `${this.apiUrl}/stats`,
      { headers }
    );
  }
}