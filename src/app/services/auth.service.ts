import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  register(username, password) {
    return this.http.post(`${this.apiUrl}/auth/register`, { username, password })
  }

  login(username, password) {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password })
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return token !== '' && token !== undefined && token !== null;
  }

}

