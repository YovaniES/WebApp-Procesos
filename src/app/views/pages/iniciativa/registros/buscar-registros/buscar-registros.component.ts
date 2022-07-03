import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalRegistroService } from 'src/app/core/services/modalRegistro.service';

@Component({
  selector: 'app-buscar-registros',
  templateUrl: './buscar-registros.component.html',
  styles: [
  ]
})
export class BuscarRegistrosComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  registros: Array<any> = [];
  totalRegistros: number = 0;

  filtro = {
    nombre              : '',
    codigo              : '',
    estado              : '',
    gerencia_benef      : '',
    naturaleza          : '',
    fechaCreacion       : '',
    fechaFinalizacion   : '',
  };

  constructor(private modalRegistroService: ModalRegistroService,
              private spinner: NgxSpinnerService,
              public datepipe: DatePipe,
    ) { }

  ngOnInit(): void {
    this.spinner.hide();

    this.cargarRegistro();
    this.getListEstados();
    this.getListGerencia();
    this.getListNaturaleza();
  }


    // ID BUSCADORES
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


      // LISTA DE ESTADOS
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

    // LISTA DE GERENCIA
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

  // Lista de NATURALEZA
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
  };


    // BUSCAR EN LA TABLA
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
    };

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
}
