import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Registro } from 'src/app/core/interfaces/registro.interface';
import { ModalRegistroService } from 'src/app/core/services/modalRegistro.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalCrearRegistroComponent } from './modal-crear-registro/modal-crear-registro.component';
import { ModalActualizarRegistroComponent } from './modal-registro-actualizar/modal-actualizar-registro.component';


@Component({
  selector: 'app-bandeja-fact',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],

})
export class RegistroComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  // @ViewChild('btnRegistrarRegistro') btnRegistrarRegistro!: ElementRef;

  showing=1;
  actionBtn: number = 0

  page = 1;
  totalBandeja:number = 0;
  pageSize = 8;
  pageSizes = [3, 6, 9];

  totalRegistros: number = 0;
  loadingItem: boolean = false;
  loadingInbox = false;

  cargando: boolean = true;
  data: any[] = [];

  fechaing:any;

    filtro = {
      nombre              : '',
      codigo              : '',
      estado              : '',
      gerencia_benef      : '',
      naturaleza          : '',
      fechaCreacion       : '',
      fechaFinalizacion   : '',
    };


  constructor(
    private modalRegistroService: ModalRegistroService,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.spinner.hide();

    this.cargarRegistro();
    this.getListEstados();
    this.getListGerencia();
    this.getListNaturaleza();
  }

  idEstadoBuscar: any;
  getInfoEstadoBuscar(id:any){
    this.idEstadoBuscar = id;
  }

  idGerSolcBuscar: any
  getInfoGerSolBuscar(id: any){
    this.idGerSolcBuscar = id
  }

  idNaturalezaBuscar: any
  getInfoNaturalezaBuscar(id: any){
    this.idNaturalezaBuscar = id;
  }


  listEstados: Array<any> = [];
  getListEstados(){
    let parametro: any[] = [
      { queryId: 89 }
    ];

    this.modalRegistroService.getListEstados(parametro[0]).subscribe(resp => {
      const estadosData: any[] = Array.of(resp);

      this.listEstados = [];
      for (let i = 0; i < estadosData[0].list.length; i++) {
        this.listEstados.push({
          idEstado:     estadosData[0].list[i].idEstado,
          cNombre :     estadosData[0].list[i].cNombre,
        });
      }
    })
  };

  listGerencia: Array<any> = [];
  getListGerencia(){
      let parametro: any[] = [
        { queryId: 95 }
      ];

      this.modalRegistroService.getListGerencia(parametro[0]).subscribe((resp) => {
        const gerencData: any[] = Array.of(resp);

        this.listGerencia = [];
        for (let i = 0; i < gerencData[0].list.length; i++) {
          this.listGerencia.push({
            id:     gerencData[0].list[i].id,
            nombre: gerencData[0].list[i].nombre,
          });
        }
      })
    };

  naturaleza: Array<any> = [];
  getListNaturaleza() {
    let parametro: any[] = [
      { queryId: 90, },
    ];
    this.modalRegistroService.getListNaturaleza(parametro[0]).subscribe((resp) => {

      const dataNaturaleza: any[] = Array.of(resp);

          this.naturaleza = [];
          for (let i = 0; i < dataNaturaleza[0].list.length; i++) {
            this.naturaleza.push({
              id    : dataNaturaleza[0].list[i].id,
              nombre: dataNaturaleza[0].list[i].nombre
            })
          }
        });
  }


    totalFiltroEncontrado: number = 0;
    buscarRegistro(){
      this.registros = [];
      this.totalRegistros = 0;

    this.blockUI.start("Buscando información...");
      // this.spinner.show();
      let parametro: any[] = [{
        "queryId": 96,
        "mapValue": {
          "param_nombre"         : this.filtro.nombre,
          "param_codigo"         : this.filtro.codigo,
          "param_id_ger_ben"     : this.filtro.gerencia_benef,
          "param_id_estado"      : this.filtro.estado,

          "param_id_naturaleza"  : this.idNaturalezaBuscar,
          "inicio": this.datepipe.transform(this.filtro.fechaCreacion,'yyyy/MM/dd'),
          "fin"   : this.datepipe.transform(this.filtro.fechaFinalizacion,'yyyy/MM/dd'),
        }
      }];

      this.modalRegistroService.buscarRegistro(parametro[0]).subscribe(resp => {
      this.blockUI.stop();

        const searchData:any[] = Array.of(resp);
        this.totalFiltroEncontrado = searchData[0].list.length;


        console.log('RESUL_BUSQ', searchData);
        console.log('Total-busq', this.totalFiltroEncontrado);


        this.registros = [];
        for (let i = 0; i < searchData[0].list.length; i++) {

          this.registros.push({
            idIniciativa          :searchData[0].list[i].idIniciativa,
            nombre                :searchData[0].list[i].nombre,
            codigo                :searchData[0].list[i].codigo,
            estado                :searchData[0].list[i].estado,
            po_proyecto           :searchData[0].list[i].po_proyecto,
            gerencia_beneficiaria :searchData[0].list[i].gerencia_beneficiaria,
            naturaleza            :searchData[0].list[i].naturaleza,
            fecha_creacion        :searchData[0].list[i].fecha_creacion
          });
        }
      // this.blockUI.stop();
        this.spinner.hide();
      });
    }

   registros: Array<any> = [];
   cargarRegistro(){
    this.registros = [];
    this.totalRegistros = 0;
    this.blockUI.start("Cargando registros...");

     let arrayParametro: any[] = [
       { queryId:92 }
     ];

     this.modalRegistroService.getListaBandeja(arrayParametro[0])
         .subscribe(resp => {
           this.blockUI.stop();

           const dataReg: any[] = Array.of(resp);
           this.totalRegistros = dataReg[0].list.length;
           this.registros = [];
             console.log('REGISTROS_TABLA', dataReg, this.totalRegistros);

             for (let i = 0; i < dataReg[0].list.length; i++) {
               this.registros.push({
               idIniciativa          : dataReg[0].list[i].idIniciativa,
               nombre                : dataReg[0].list[i].nombre,
               codigo                : dataReg[0].list[i].codigo,
               estado                : dataReg[0].list[i].estado,
               po_proyecto           : dataReg[0].list[i].po_proyecto,
               gerencia_beneficiaria : dataReg[0].list[i].gerencia_beneficiaria,
               naturaleza            : dataReg[0].list[i].naturaleza,
               fecha_creacion        : dataReg[0].list[i].fecha_creacion,
             })
           }
         })
   }


  totalfiltro = 0;
  cambiarPagina(event: number) {
    let offset = event*10;
    this.spinner.show();

    if (this.totalfiltro != this.totalBandeja) {
      this.modalRegistroService.getListaBandeja(offset.toString())
          .subscribe( resp => {
            console.log('TABLA', resp);

       const arrayData:any[] = Array.of(resp);

            for (let i = 0; i < arrayData[0].length; i++) {
              this.registros.push({
                idIniciativa          : arrayData[0].list[i].idIniciativa,
                nombre                : arrayData[0].list[i].nombre,
                codigo                : arrayData[0].list[i].codigo,
                estado                : arrayData[0].list[i].estado,
                po_proyecto           : arrayData[0].list[i].po_proyecto,
                gerencia_beneficiaria : arrayData[0].list[i].gerencia_beneficiaria,
                naturaleza            : arrayData[0].list[i].naturaleza,
                fecha_creacion        : arrayData[0].list[i].fecha_creacion,
              });
            }
            this.spinner.hide();
          });
    } else {
      this.spinner.hide();
    }
      this.page = event;
  }


  @ViewChild('modalEliminar') modalEliminar!: ElementRef;
  eliminarRegistro(idRegistro: any){
    this.spinner.show();

    let parametro:any[] = [{
      queryId: 98,
      mapValue: {
        'param_id_registro'   : idRegistro,
        // 'CONFIG_REGIS_ID'  : this.usuario.user.userId,
        'CONFIG_OUT_MSG_ERROR': '',
        'CONFIG_OUT_MSG_EXITO': ''
      }
    }];

    this.modalRegistroService.eliminarRegistro(parametro[0]).subscribe(resp => {
      const data:any[] = Array.of(resp);

      let msj = data[0].exitoMessage;
      let msj2 = data[0].errorMessage

      this.modalEliminar.nativeElement.click();
      this.cargarRegistro();


      Swal.fire({
        title: 'Registro eliminado',
        text: 'El registro fue eliminado con éxito',
        icon: 'success',
      });
    });
    this.spinner.hide();
  }

  borrarRegistroX(regist: Registro) {
    let arrayParametro:any[] = [{
      "queryId": 98,
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

  limpiarFiltro(){
    this.filtro.nombre             = '',
    this.filtro.codigo             = '',
    this.filtro.estado             = '',
    this.filtro.gerencia_benef     = '',
    this.filtro.naturaleza         = '',
    this.filtro.fechaCreacion      = ''
    this.filtro.fechaFinalizacion  = ''

    this.cargarRegistro();
  }

  crearIniciativa(){
    const dialogRef = this.dialog.open(ModalCrearRegistroComponent, {width:'1000px'});

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.cargarRegistro()
      }
    })
  }

  editarIniciativa(idIniciativa: any) {
    this.dialog
      .open(ModalActualizarRegistroComponent, { width: '1125px', data: idIniciativa, })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.cargarRegistro();
        }
      });
  }

}


