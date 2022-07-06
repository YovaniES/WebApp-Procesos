import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { Router } from '@angular/router';
import { AuthResponse, Users } from '../interfaces/auth.interface';
import { API_AUTH_SESSION } from '../constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  toggleUserPanel = new EventEmitter<boolean>();

  private _usuario!: Users;

  constructor(private http: HttpClient, private router: Router) {}

  get usuario() {
    return { ...this._usuario };
  }

  login(loginData: AuthResponse) {
    return this.http.post(API_AUTH_SESSION, loginData).pipe(
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

  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return jwt_decode(token);
    } else {
      return null;
    }
  }

  // getToken(){
  //   return localStorage.getItem('token')
  // }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token')
    let validSession = false;
    let decodedToken: any = null;

    try {
      if (token) {
        decodedToken = jwt_decode(token);
      }

      if (
        decodedToken && decodedToken.exp // &&    decodedToken.exp > Date.now() / 1000
      ) {
        validSession = true;
      }
      return validSession;
    } catch (err) {
      return false;
    }
  }
}
