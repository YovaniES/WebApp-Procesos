import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_REG } from '../constants/url.constants';
import { Registro } from '../interfaces/registro.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalRegistroService {
  constructor(private http: HttpClient) {}

  cargarRegistro(): Observable<any> {
    return this.http.get(API_REG);
  }

  crearRegistro(data: any): Observable<any> {
    return this.http.post<any>(API_REG, data);
  }

  actualizarRegistro(data: any, id: number) {
    const url = `${API_REG}/${id}`;
    return this.http.put(url, data);
  }

  eliminarRegistro(id: number) {
    // const url = `${API_REG}/${registro.id}`;
    const url = `${API_REG}/${id}`;
    return this.http.delete(url);
  }

  // deleteRegistro(id: number){
  //   const url = `${API_REG}/${id}`;
  //   return this.http.delete(url);
  // }

  getAllRequest(page:number, size:number, filter:string, status:number): Observable<Object>{
    let params = '?page=' + page + '&size='+size;
    params = '&rfilter=' + filter;
    params = 'rstatus=' + status
    return this.http.get(API_REG + params)
  }
}
