import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
/* import {
  API_VAC_DETAILS,
  API_VAC_GETALL,
  API_VAC_REQUEST,
  API_VAC_UPDATE,
  API_VAC_UPDSTATUS,
  API_VAC_SEARCHPO,
  API_VAC_TOAPROBE,
  API_VAC_UPLOAD,
  API_VAC_DOWNLOAD,
  API_VAC_DOWNALL,
  API_VAC_UPLOADTOREQ,
} from '@cli-constants'; */
import { Observable } from 'rxjs';
import {
  API_VAC_GETALL,
  API_VAC_DETAILS,
  API_VAC_REQUEST,
  API_VAC_UPDSTATUS,
  API_VAC_UPDATE,
  API_VAC_SEARCHPO,
  API_VAC_TOAPROBE,
  API_VAC_UPLOAD,
  API_VAC_UPLOADTOREQ,
  API_VAC_DOWNLOAD,
  API_VAC_DOWNALL,
} from 'src/app/core/constants/url.constants';
import { vacantFlow, vacantRequest, vacantUpdate } from './vacancies.model';

@Injectable({
  providedIn: 'root',
})
export class VacanciesService {
  constructor(private http: HttpClient) {}

  getAllRequests$(
    page: number,
    size: number,
    filter: string,
    status: number,
    command: string,
    workstream: string,
    bu: string,
    type: string,
    ambit: string,
    init: Date,
    end: Date
  ): Observable<Object> {
    let params = '?page=' + page + '&size=' + size;
    params = params + '&vfilter=' + filter;
    params = params + '&vstatus=' + status;
    params = params + '&command=' + command;
    params = params + '&workstream=' + workstream;
    params = params + '&bu=' + bu;
    params = params + '&vtype=' + type;
    params = params + '&ambit=' + ambit;
    params = params + '&vinicio=' + init;
    params = params + '&vfin=' + end;
    return this.http.get(API_VAC_GETALL + params);
  }

  getVacantDetail$(id: number): Observable<Object> {
    return this.http.get(API_VAC_DETAILS + '?id=' + id);
  }

  postNewVacanciRequest(req: vacantRequest[]): Observable<Object> {
    return this.http.post(API_VAC_REQUEST, req);
  }

  updateVacantStatus$(req: vacantRequest): Observable<Object> {
    return this.http.post(API_VAC_UPDSTATUS, req);
  }

  updateVacantData$(req: vacantUpdate): Observable<Object> {
    return this.http.post(API_VAC_UPDATE, req);
  }

  getPosList$(filter: string): Observable<Object> {
    return this.http.get(API_VAC_SEARCHPO + '?filter=' + filter);
  }

  getToAprobe$(): Observable<Object> {
    return this.http.get(API_VAC_TOAPROBE);
  }

  getVacantFlow(flagnew: boolean, type: number): string[] {
    const flow: any = completeFlows.find((p) => p.type == type);
    if (flow) {
      if (flagnew) return flow.new;
      else return flow.old;
    } else {
      return [];
    }
  }

  getFlowAction(name: string): string {
    const idx = actionsFlow.findIndex((p) => p.name == name);
    if (idx != -1) return actionsFlow[idx].action;
    else return '';
  }

  getFlowStatus(name: string): string {
    const idx = actionsFlow.findIndex((p) => p.name == name);
    if (idx != -1) return actionsFlow[idx].state || '';
    else return '';
  }

  uploadAttachToVacant(e: any): Observable<Object> {
    let formData = new FormData();
    formData.append('file', e);
    return this.http.post(API_VAC_UPLOAD, formData);
  }

  uploadAttachToRequest(e: any, id: number): Observable<Object> {
    let formData = new FormData();
    formData.append('file', e);
    formData.append('id', id.toString());
    return this.http.post(API_VAC_UPLOADTOREQ, formData);
  }

  downloadAttachToVacant(nameFile: string): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/pdf; charset=utf-8');
    return this.http.get(API_VAC_DOWNLOAD + '?filename=' + nameFile, {
      headers: new HttpHeaders(),
      observe: 'response',
      responseType: 'blob',
    });
  }

  donwloadAllAttchedFiles(id: number): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Accept',
      'application/octet-stream; charset=utf-8'
    );
    return this.http.get(API_VAC_DOWNALL + '?id=' + id, {
      headers: new HttpHeaders(),
      observe: 'response',
      responseType: 'blob',
    });
  }
}

const actionsFlow = [
  {
    name: 'INF',
    action: 'Registró el requerimiento.',
    state: 'Inicio',
  },
  {
    name: 'AORG',
    action: 'Aprobó en Organización.',
    state: 'Organización',
  },
  {
    name: 'ACV',
    action: 'Validó eficiencia.',
    state: 'Captura de valor',
  },
  {
    name: 'ACOM',
    action: 'Aprobó en Comité.',
    state: 'Comité',
  },
  {
    name: 'RORG',
    action: 'Rechazó en Organización.',
  },
  {
    name: 'RCV',
    action: 'Rechazó en Captura de valor.',
  },
  {
    name: 'RCOM',
    action: 'Rechazó en Comité.',
  },
  {
    name: 'START',
    action: 'Inició el reclutamiento.',
    state: 'Seguimiento SSFF',
  },
  {
    name: 'END',
    action: 'Terminó el proceso.',
    state: 'Fin del proceso',
  },
];

const completeFlows: vacantFlow[] = [
  {
    type: 1,
    title: 'Externa',
    old: ['INF', 'ACV', 'ACOM', 'START', 'END'],
    new: ['INF', 'AORG', 'ACOM', 'START', 'END'],
  },
  {
    type: 2,
    title: 'Interna Lider',
    old: ['INF', 'ACV', 'START', 'END'],
    new: ['INF', 'AORG', 'START', 'END'],
  },
  {
    type: 3,
    title: 'Interna C.I.',
    old: ['INF', 'ACV', 'START', 'END'],
    new: ['INF', 'AORG', 'START', 'END'],
  },
  {
    type: 4,
    title: 'Mixta',
    old: ['INF', 'ACV', 'ACOM', 'START', 'END'],
    new: ['INF', 'AORG', 'ACOM', 'START', 'END'],
  },
];
