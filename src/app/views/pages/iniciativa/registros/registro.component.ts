import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalCrearIniciativaComponent } from './crear-iniciativa/modal-crear-iniciativa.component';
import { ModalActualizarIniciativaComponent } from './actualizar-iniciativa/modal-actualizar-iniciativa.component';
import { Registro } from 'src/app/core/interfaces/registro.interface';
import { IniciativaService } from 'src/app/core/services/iniciativa.service';


@Component({
  selector: 'app-bandeja-fact',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],

})
export class RegistroComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  page = 1;
  totalBandeja:number = 0;
  pageSize = 10;
  pageSizes = [3, 6, 9];

  totalRegistros: number = 0;
  loadingItem: boolean = false;

  data: any[] = [];

  filtro = {
      nombre              : '',
      codigo              : '',
      estado              : '',
      gerencia_benef      : '',
      naturaleza          : '',
      fechaCreaInicio     : '',
      fechaCreaFin        : '',
    };


  constructor(
    private iniciativaService: IniciativaService,
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

  listEstados: Array<any> = [];
  getListEstados(){
    let parametro: any[] = [
      { queryId: 89 }
    ];

    this.iniciativaService.getListEstados(parametro[0]).subscribe(resp => {
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

      this.iniciativaService.getListGerencia(parametro[0]).subscribe((resp) => {
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
    this.iniciativaService.getListNaturaleza(parametro[0]).subscribe((resp) => {

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

    this.blockUI.start("Buscando iniciativas...");
      // this.spinner.show();
      let parametro: any[] = [{
        "queryId": 96,
        "mapValue": {
          "param_nombre"         : this.filtro.nombre,
          "param_codigo"         : this.filtro.codigo,
          "param_id_ger_ben"     : this.filtro.gerencia_benef,
          "param_id_estado"      : this.filtro.estado,

          "param_id_naturaleza"  : this.filtro.naturaleza,
          "inicio": this.datepipe.transform(this.filtro.fechaCreaInicio,'yyyy/MM/dd'),
          "fin"   : this.datepipe.transform(this.filtro.fechaCreaFin,'yyyy/MM/dd'),
        }
      }];

      this.iniciativaService.buscarRegistro(parametro[0]).subscribe(resp => {
      this.blockUI.stop();

        const searchData:any[] = Array.of(resp);
        this.totalFiltroEncontrado = searchData[0].list.length;

        // console.log('RESUL_BUSQ', searchData);
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
    this.blockUI.start("Cargando iniciativas...");

     let arrayParametro: any[] = [
       { queryId:92 }
     ];

     this.iniciativaService.getListaBandeja(arrayParametro[0])
         .subscribe(resp => {
           this.blockUI.stop();

           const dataReg: any[] = Array.of(resp);
           this.totalRegistros = dataReg[0].list.length;
           this.registros = [];

             for (let i = 0; i < dataReg[0].list.length; i++) {
               this.registros.push({
               idIniciativa          : dataReg[0].list[i].idIniciativa,
               nombre                : dataReg[0].list[i].nombre,
               codigo                : dataReg[0].list[i].codigo,
               estado                : dataReg[0].list[i].estado,
               po_proyecto           : dataReg[0].list[i].po_proyecto,
               responsable           : dataReg[0].list[i].responsable,
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
      this.iniciativaService.getListaBandeja(offset.toString())
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


  eliminarIniciativa(id: any){
    this.spinner.show();

    let parametro:any[] = [{
      queryId: 104,
      mapValue: {
        'param_id_iniciativa' : id ,
        // 'CONFIG_REGIS_ID'  : this.usuario.user.userId,
        'CONFIG_REGIS_ID'     : '' ,
        'CONFIG_OUT_MSG_ERROR': '' ,
        'CONFIG_OUT_MSG_EXITO': ''
      }
    }];


    Swal.fire({
      title: '¿Borrar Iniciativa?',
      text: `¿Estas seguro que deseas eliminar la iniciativa?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((resp) => {
      if (resp.value) {
        this.iniciativaService.eliminarIniciativa(parametro[0]).subscribe(resp => {
          const data:any[] = Array.of(resp);

            this.cargarRegistro();

            Swal.fire({
              title: 'Iniciativa eliminado',
              text: 'La Iniciativa fue eliminado con éxito',
              icon: 'success',
            });
          });
      }
    });
    this.spinner.hide();
  }

  borrarRegistro(regist: Registro) {
    let arrayParametro:any[] = [{
      "queryId": 103,
      "mapValue": {
        "p_id": regist.idIniciativa
      }
    }];

    Swal.fire({
      title: '¿Borrar registro?',
      text: `¿Estas seguro que deseas eliminar a ${regist.nombre} del registro?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((resp) => {
      if (resp.value) {
        this.iniciativaService
          .eliminarRegistro(regist.idIniciativa).subscribe((resp) => {

            console.log('ELIMINADO', resp);

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
    this.filtro.fechaCreaInicio      = ''
    this.filtro.fechaCreaFin  = ''

    this.cargarRegistro();
  }

  crearIniciativa(){
    const dialogRef = this.dialog.open(ModalCrearIniciativaComponent, {width:'1000px'});

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.cargarRegistro()
      }
    })
  }

  editarIniciativa(idIniciativa: any) {
    this.dialog
      .open(ModalActualizarIniciativaComponent, { width: '1125px', data: idIniciativa, })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.cargarRegistro();
        }
      });
  }

}


