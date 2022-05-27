import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_MENU, API_VAC_DETAILS } from '../constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class VacanciesService {

  constructor(private http: HttpClient) {}



  getVacantDetail$(id:number):Observable<Object>{
    return this.http.get(API_VAC_DETAILS + "?id=" + id);
  }

}
