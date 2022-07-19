import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/auth.interface';
import { API_AUTH_SESSION } from '../constants/url.constants';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  toggleUserPanel = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  login(loginData: Usuario) {
    return this.http.post<any>(API_AUTH_SESSION, loginData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.user.token);
        localStorage.setItem('currentUser', JSON.stringify(resp));
      })
    );
  }

  getUsername() {
    const decodedToken: any = this.decodeToken();
    // console.log('TOKEN', decodedToken);
    return decodedToken ? decodedToken.name : '';
  }

  getCurrentUser() {
    const currentUser: any = localStorage.getItem('currentUser');
    // console.log('USER-ACTUAL',JSON.parse(currentUser));

    return of(currentUser ? JSON.parse(currentUser) : '');
  }

  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return jwt_decode(token);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    let validSession = false;
    let decodedToken: any = null;

    try {
      if (token) {
        decodedToken = jwt_decode(token);
      }

      if (decodedToken && decodedToken.exp) {
        validSession = true;
      }
      return validSession;
    } catch (err) {
      return false;
    }
  }

  logout() {
    this.router.navigateByUrl('auth');
    localStorage.clear();
  }
}
