import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { Router } from '@angular/router';
import { Usuario } from '../interfaces/auth.interface';
import { API_AUTH_SESSION } from '../constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  toggleUserPanel = new EventEmitter<boolean>();

  constructor(private http: HttpClient,
              private router: Router,
  ) {}

  login(loginData: Usuario) {
    return this.http.post<any>(API_AUTH_SESSION, loginData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.user.token);
        localStorage.setItem('currentUser', JSON.stringify(resp))
      })
    );
  }

  logout() {
    this.router.navigateByUrl('auth');
    localStorage.clear();
  }

  getUsername() {
    const decodedToken: any = this.decodeToken();
    console.log('NAME_USER', decodedToken);

    return decodedToken ? decodedToken.unique_name : '';
  }

  getCurrentUser(){
    const currentUser: any = localStorage.getItem('currentUser')
    console.log('USER-ACTUAL',currentUser);

    return currentUser ? currentUser.userName : '';
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
    const token = localStorage.getItem('token')
    let validSession = false;
    let decodedToken: any = null;

    try {
      if (token) {
        decodedToken = jwt_decode(token);
      }

      if (
        decodedToken && decodedToken.exp
      ) {
        validSession = true;
      }
      return validSession;
    } catch (err) {
      return false;
    }
  }
}
