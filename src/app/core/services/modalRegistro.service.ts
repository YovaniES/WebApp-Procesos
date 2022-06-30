import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_REG1 } from '../constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class ModalRegistroService {
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
  agregarRegistro(obj: any){
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

