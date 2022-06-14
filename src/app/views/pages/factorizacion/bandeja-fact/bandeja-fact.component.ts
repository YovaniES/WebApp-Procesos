import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';
import { Registro } from 'src/app/core/interfaces/registro.interface';
import { ModalRegistroService } from 'src/app/core/services/modalRegistro.service';
import Swal from 'sweetalert2';
import { ModalBandejaComponent } from './modal-bandeja/modal-bandeja.component';

@Component({
  selector: 'app-bandeja-fact',
  templateUrl: './bandeja-fact.component.html',
  styleUrls: ['./bandeja-fact.component.scss'],
})
export class BandejaFactComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  page = 1;
  totalBandeja:number = 0;
  pageSize = 7;
  pageSizes = [3, 6, 9];

  totalRegistros: number = 0;
  loadingItem: boolean = false;
  loadingInbox = false;

  cargando: boolean = true;
  data: any[] = [];

  constructor(
    private modalRegistroService: ModalRegistroService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.cargarRegistro();
    this.listaEstados();
  }

  totalBusqueda = 0;
  registros: Array<any> = [];

  cambiarPagina(event: number) {
    let offset = event*10;

    if (this.totalBusqueda != this.totalBandeja) {
      this.modalRegistroService.getListaBandeja(offset.toString())
          .subscribe( resp => {

       const arrayData:any[] = Array.of(resp);

            for (let i = 0; i < arrayData[0].length; i++) {

              this.registros.push({
                idIniciativa          : arrayData[0].list[i].idIniciativa,
                Nombre                : arrayData[0].list[i].Nombre,
                Codigo                : arrayData[0].list[i].Codigo,
                VP                    : arrayData[0].list[i].VP,
                Gerencia_Solicitante  : arrayData[0].list[i].Gerencia_Solicitante,
                PO_Proyecto           : arrayData[0].list[i].PO_Proyecto,
                Responsable           : arrayData[0].list[i].Responsable,
                Gerencia_Beneficiaria : arrayData[0].list[i].Gerencia_Beneficiaria,
                Planner               : arrayData[0].list[i].Planner,
                Controller_Ger_Ben    : arrayData[0].list[i].Controller_Ger_Ben,
                Controller_Aprob_BC   : arrayData[0].list[i].Controller_Aprob_BC,
                Tecnologia            : arrayData[0].list[i].Tecnologia,
                Licencias             : arrayData[0].list[i].Licencias,
                Naturaleza            : arrayData[0].list[i].Naturaleza,
              });
            }
          })
    }
    this.page = event;
  }

/*   getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.modalRegistroService.getAll(params).subscribe(
      (resp) => {
        const { registros, totalItems } = resp;
        this.registros = registros;
        this.totalBandeja = totalItems;

        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );
  } */

/*   cargarRegistro() {
    this.cargando = true;
    this.modalRegistroService.cargarRegistro().subscribe((resp) => {
      this.registros = resp;
      this.totalRegistros = resp.length;
    });
  } */

  cargarRegistro(){
    let arrayParametro: any[] = [
      {
        queryId:92,
      }
    ];
    this.modalRegistroService.getListaBandeja(arrayParametro[0])
        .subscribe(resp => {

          const data: any[] = Array.of(resp);
          this.totalRegistros = data[0].list.length;
          this.registros = [];

          console.log('REGISTROS TABLA', data);

          for (let i = 0; i < data[0].list.length; i++) {

            this.registros.push({
              idIniciativa          : data[0].list[i].idIniciativa,
              Nombre                : data[0].list[i].Nombre,
              Codigo                : data[0].list[i].Codigo,
              VP                    : data[0].list[i].VP,
              Gerencia_Solicitante  : data[0].list[i].Gerencia_Solicitante,
              PO_Proyecto           : data[0].list[i].PO_Proyecto,
              Responsable           : data[0].list[i].Responsable,
              Gerencia_Beneficiaria : data[0].list[i].Gerencia_Beneficiaria,
              Planner               : data[0].list[i].Planner,
              Controller_Ger_Ben    : data[0].list[i].Controller_Ger_Ben,
              Controller_Aprob_BC   : data[0].list[i].Controller_Aprob_BC,
              Tecnologia            : data[0].list[i].Tecnologia,
              Licencias             : data[0].list[i].Licencias,
              Naturaleza            : data[0].list[i].Naturaleza,
            })
          }
        })
  }

  listaEstados() {
    let arrayParametro: any[] = [
      {
        queryId: 91,
        MapValue: {
          offset: 0,
        },
      },
    ];
    this.modalRegistroService.lista(arrayParametro[0])
      .subscribe((resp: any) => {
        this.data = resp;
        console.log('USERS', resp.list);
      });
  }

/*   listaTecnologia() {
    let arrayParametro: any[] = [
      {
        queryId: 89,
        MapValue: {
          offset: 0,
        },
      },
    ];
    this.modalRegistroService
      .listaTecnologia(arrayParametro[0])
      .subscribe((resp: any) => {
        // this.data = resp.list;
        console.log('TECNOLOGIA', resp.list);
      });
  } */

  borrarRegistro(regist: Registro) {

    let arrayParametro:any[] = [{
      "queryId": 9,
      "mapValue": {
        "param_id_persona": regist
      }
    }];

    Swal.fire({
      title: '¿Borrar registro?',
      text: `¿Estas seguro que deseas eliminar a ${regist.Nombre} del registro?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((resp) => {
      if (resp.value) {
        this.modalRegistroService
          .eliminarRegistro(regist.idIniciativa)
          .subscribe((resp1) => {
            this.cargarRegistro();

            Swal.fire({
              title: 'Registro eliminado',
              text: 'El registro fue eliminado con éxito',
              icon: 'success',
            });
          });
      }
    });
  }

  crearRegistro() {
    const dialogRef = this.dialog.open(ModalBandejaComponent, {
      width: '1125px',
    });

    dialogRef.afterClosed().subscribe((resp) => {

      if (resp) {
        this.cargarRegistro();
      }
    });
  }

  editarRegistro(registro: Registro) {
    this.dialog
      .open(ModalBandejaComponent, { width: '1125px', data: registro })
      .afterClosed()
      .subscribe((resp1) => {
        if (resp1 == 'update') {
          this.cargarRegistro();
        }
      });
  }

/*   doPageChange(i: number) {
    this.table_settings.page = this.table_settings.page + i;
    this.callItemApi();
  }

  callItemApi() {} */
}
