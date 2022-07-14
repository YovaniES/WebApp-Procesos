import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_REG1 } from '../constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class IniciativaService {
  constructor(private http: HttpClient) {}

  eliminarIniciativa(id: number) {
    return this.http.post(API_REG1, id);
  }

  // OBTENEMOS LA DATA DESDE .NET
  listaTecnologia(obj: any) {
    return this.http.post(API_REG1, obj).pipe(
      map((tecno: any) => {
        return tecno.list.map((tec: any) => {
          return {
            id: tec.id,
            nombre: tec.nombre
          }
        })
      })
    );
  }

  // Lista de Naturaleza
  getListNaturaleza(obj: any) {
    return this.http.post(API_REG1, obj).pipe(
      map((naturaleza: any) => {
        return naturaleza.list.map((nat: any) => {
          return {
            id: nat.id,
            id_naturaleza: nat.id_naturaleza,
            nombre: nat.nombre,
          };
        });
      })
    );
  }

  // Lista de VP
  getListVP(obj: any) {
    return this.http.post(API_REG1, obj).pipe(
      map((listVP: any) => {
        return listVP.list.map( (vp: any) => {
          return {
            id    : vp.id,
            nombre: vp.nombre
          }
        })
      })
    );
  }

  // lista ESTADOS
  getListEstados(obj: any, mapList: boolean = true): Observable<any> {
    return this.http.post(API_REG1, obj).pipe(
      map((estados: any) => {
        return mapList
          ? estados.list.map((estado: any) => {
              return {
                idEstado: estado.idEstado,
                cNombre : estado.cNombre,
              };
            })
          : estados;
      })
    );
  }

  // lista Gerencia
  getListResponsable(obj: any) {
    return this.http.post(API_REG1, obj);
  }

  // lista Gerencia
  getListGerencia(obj: any) {
    return this.http.post(API_REG1, obj).pipe(
      map((gerenc: any) => {
        return gerenc.list.map( (ger: any) => {
          return {
            id    : ger.id,
            nombre: ger.nombre
          }
        })
      })
    );
  }

  // LISTA PARA LA TABLA
  cargarRegistro(id: any) {
    return this.http.post(API_REG1, id).pipe(
      map((registro: any) => {
        return registro.list.map((reg: any) => {
          return {
            idIniciativa          : reg.idIniciativa ,
            nombre                : reg.nombre ,
            codigo                : reg.codigo ,
            estado                : reg.estado ,
            po_proyecto           : reg.po_proyecto ,
            responsable           : reg.responsable ,
            gerencia_beneficiaria : reg.gerencia_beneficiaria ,
            naturaleza            : reg.naturaleza ,
            fecha_creacion        : reg.fecha_creacion ,
          }
        })
      })
    );
  }

  //BUSCAR REGISTRO
  buscarRegistro(id: any) {
    return this.http.post(API_REG1, id).pipe(
      map((regist: any) => {
        return regist.list.map((reg: any) => {
          return {
            idIniciativa          : reg.idIniciativa ,
            nombre                : reg.nombre ,
            codigo                : reg.codigo ,
            estado                : reg.estado ,
            po_proyecto           : reg.po_proyecto ,
            responsable           : reg.responsable ,
            gerencia_beneficiaria : reg.gerencia_beneficiaria ,
            naturaleza            : reg.naturaleza ,
            fecha_creacion        : reg.fecha_creacion ,
          }
        })
      })
    );
  }

  //INSERTAR REGISTRO A LA TABLA
  crearIniciativa(obj: any) {
    return this.http.post(API_REG1, obj);
  }

  cargarRegistroId(obj: any) {
    return this.http.post(API_REG1, obj)
  }

  actualizarRegistro(obj: any) {
    return this.http.post(API_REG1, obj);
  }

  cargarIniciatCambios(obj: any) {
    return this.http.post(API_REG1, obj).pipe(
      map((histCamb:any) => {
        return histCamb.list.map( (historico: any) => {
          return {
            id           : historico.id,
            idiniciativa : historico.idiniciativa,
            cdescripcion : historico.cdescripcion,
            estado       : historico.estado,
            motivo       : historico.motivo,
            fecha_cambio : historico.fecha_cambio,
            usuario      : historico.usuario,
          }
        })
      })
    );
  }

  agregarIniciativaCambios(obj: any) {
    return this.http.post(API_REG1, obj);
  }

}
