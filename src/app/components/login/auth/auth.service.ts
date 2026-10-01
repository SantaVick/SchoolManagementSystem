import { Injectable, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: UserDto;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private readonly apiUrl =
    'http://localhost:8080/api/auth';


  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }


  getCurrentUser(): Observable<UserDto> {

    if (!isPlatformBrowser(this.platformId)) {
      return new Observable();
    }

    const token =
      localStorage.getItem('auth_token') ||
      sessionStorage.getItem('auth_token');

    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    return this.http.get<UserDto>(
      `${this.apiUrl}/me`,
      { headers }
    );
  }


  logout(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
  }
}