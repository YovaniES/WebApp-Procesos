import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { API_REG, API_REG1 } from '../constants/url.constants';

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
    const url = `${API_REG1}/${id}`;
    return this.http.post(url, id);
  }

  // OBTENEMOS LA DATA DESDE .NET
  listaTecnologia(obj:any){
    return this.http.post(API_REG1, obj)
  }

  lista(obj:any){
    return this.http.post(API_REG1, obj)
  }


  // Lista de Naturaleza
  getListNaturaleza(obj: any){
    return this.http.post(API_REG1,obj);
  }

   // Lista de VP
   getListVP(obj: any){
    return this.http.post(API_REG1,obj);
  }

  // lista Gerencia
  getListGerencia(obj:any){
    return this.http.post(API_REG1, obj)
  }


  // LISTA PARA LA TABLA
  getListaBandeja(id: any){
    return this.http.post(API_REG1, id)
  }

  getAll(params:any): Observable<any>{
    return this.http.get<any>(API_REG, {params})
  }


  getAllRequest(page:number, size:number, filter?:string, status?:number): Observable<Object>{
    let params = '?page=' + page + '&size='+size;
    params     = params + (filter ? '&rfilter=' + filter : '');
    params     = params + (filter ? '&status=' + status: '' );
    return this.http.get(API_REG + params)
  }

  //BUSCAR REGISTRO
  buscarRegistro(obj: any){
    return this.http.post(API_REG1,obj);
  }

  //INSERTAR REGISTRO A LA TABLA
  agregarRegistro(obj: any){
    return this.http.post(API_REG1,obj);
  }


  // ---------------------------------------------------------

  //BUSCAR PERSONA
  buscarPersona(obj: any){
    return this.http.post(API_REG1,obj);
  }


  getProyectos(queryId: any){
    return this.http.post(API_REG1,queryId);
  }

    /*PERSONAL INICIO*/
    getListaMantenimiento(queryId: string){
      return this.http.post(API_REG1,queryId);
    }

  getInfoPerfiles(obj: any){
    return this.http.post(API_REG1,obj);
  }

  getPerfiles(queryId: any){
    return this.http.post(API_REG1,queryId);
  }

  getInfoProyecto(obj: any){
    return this.http.post(API_REG1,obj);
  }

  deletePersonal(obj: any){
    return this.http.post(API_REG1,obj);
  }



}

