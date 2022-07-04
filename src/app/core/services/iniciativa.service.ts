import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_REG1, API_REG2 } from '../constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class IniciativaService {
  constructor(private http: HttpClient) {}

  eliminarRegistro(id: number) {
    const url = `${API_REG1}/${id}`;
    return this.http.post(url, id);
  }

  // OBTENEMOS LA DATA DESDE .NET
  listaTecnologia(obj:any){
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
   getListEstados(obj:any){
    return this.http.post(API_REG1, obj)
  }

  // lista Gerencia
  getListGerencia(obj:any){
    return this.http.post(API_REG1, obj)
  }


  // LISTA PARA LA TABLA
  getListaBandeja(id: any){
    return this.http.post(API_REG1, id)
  }


  //BUSCAR REGISTRO
  buscarRegistro(obj: any){
    return this.http.post(API_REG1,obj);
  }

  //INSERTAR REGISTRO A LA TABLA
  crearIniciativa(obj: any){
    return this.http.post(API_REG1,obj);
  }

  cargarRegistroId(obj: any){
    return this.http.post(API_REG1,obj);
  }

  actualizarRegistro(obj: any){
    return this.http.post(API_REG1, obj)
  }

  cargarIniciatCambios(obj: any){
    return this.http.post(API_REG1, obj)
  }

  agregarIniciativaCambios(obj: any){
    return this.http.post(API_REG1, obj)
  }


  obtenerCambiosPorIniciativa(obj:any){
    return this.http.post(API_REG1,obj);
  }

  agregarHistoricoCambios(obj: any){
    return this.http.post(API_REG1,obj);
  }

  getCambiosEstados(){
    return this.http.get(API_REG2);
  }

  // getEstados(){
  //   const urlApiReq = environment.urlApi+'getcustomquery/'+'5-xxx-0000';
  //   return this.http.get(urlApiReq);
  // }

  getHistoricoCambios(id: string){
    return this.http.get(API_REG2)
  }

}
