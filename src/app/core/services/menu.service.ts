import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_MENU } from '../constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  activeMenuMobile = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  getMenu(): Observable<any> {
    return this.http.get(API_MENU);
  }
}
