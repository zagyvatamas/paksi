import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { Profile } from '../interfaces/profile';
import { RegisterData } from '../interfaces/register';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; 
  private tokenKey = 'token';
  private loggedIn = new BehaviorSubject<boolean>(this.hasValidToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
    tap(response => {
      localStorage.setItem(this.tokenKey, response.token);
      this.loggedIn.next(true); 
    })
  );
}

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  register(username: string,email:string, password: string): Observable<RegisterData> {
    return this.http.post<RegisterData>(`${this.apiUrl}/auth/register`, {username, email, password})
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Token nem található!'));
    }
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/auth/profile`, { headers });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private hasValidToken(): boolean {
  const token = localStorage.getItem(this.tokenKey);
  if (!token) return false;

  try {

    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) < expiry;
  } catch (e) {
    return false;
  }
}

}
