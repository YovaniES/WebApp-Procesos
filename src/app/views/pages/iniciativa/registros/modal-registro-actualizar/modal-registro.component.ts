import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalRegistroService } from 'src/app/core/services/modalRegistro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

export interface EditarRegistro {
  idIniciativa          : number,
  nombre                : string,
  codigo                : string,
  vp                    : string,
  gerenciaSolic         : string,
  estado                : string,
  poProyecto            : string,
  responsable           : string,
  gerenciaBenef         : string,
  planner               : string,
  gerencia_beneficiaria
  : string,
  controllerAprobBc     : string,
  tecnologia            : string,
  licencias             : string,
  naturaleza            : string,
  fechaCreacion         : any,
}

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.scss'],
})
export class ModalRegistroComponent implements OnInit {
  @ViewChild('btnCrearRegistro') btnCrearRegistro!: ElementRef;

  fechaing:any;
  totalRegistros: number = 0;
  usuario: any;
  idRegistro: any = 0;

  contexto = {
    problematica: '',
    robotizacion: '',
    objetivo    : '',
    riesgos      : ''
  };

  diagnostico = {
    qtrx  : '',
    tmo   : '',
    pedido: '',
    flujo : ''
  }


  dataRegistroEditar: EditarRegistro= {
    idIniciativa         : 0,
    nombre               : '',
    codigo               : '',
    vp                   : '',
    gerenciaSolic        : '',
    estado               : '',
    poProyecto           : '',
    responsable          : '',
    gerenciaBenef        : '',
    planner              : '',
    gerencia_beneficiaria: '',
    controllerAprobBc    : '',
    tecnologia           : '',
    licencias            : '',
    naturaleza           : '',
    fechaCreacion        : new Date
  }


  constructor(
    private modalRegistroService: ModalRegistroService,
    private spinner: NgxSpinnerService,
    public datePipe: DatePipe,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    // this.usuario = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe( params => {
      console.log('PARAM', params);

      this.idRegistro = params.get('id');
      this.cargarRegistro();
      this.cargarRegistroId();

      this.getListEstados();
      this.getListGerencia();
      this.getListaVP();
      this.getListNaturaleza();
      this.getListaTecnologia();
    });
   }


  getInfoEstados(id: any){ }
  getInfoTecnologia(id: any){ }
  getInfoNaturaleza(id:any){ }

  idVP: any
  getInfoVP(id: any){
    this.idVP = id
  }

  idGerSol: any;
  getInfoGerSol(id: any){ this.idGerSol = id }
  getInfoGerBen(id: any){ }

  actualizarFechaCreacion(fecha: string){
    this.dataRegistroEditar.fechaCreacion = this.datePipe.transform(fecha, 'yyyy-MM-dd');
  }

     // LISTA DE VP PARA EL MODAL
     listVP: Array<any> = [];
     getListaVP() {
       let parametro: any[] = [
         { queryId: 94 },
       ];

       this.modalRegistroService.getListVP(parametro[0]).subscribe(resp =>{
         const vpData: any[] = Array.of(resp);
         console.log('VP', vpData);

         this.listVP = [];
         for (let i = 0; i < vpData[0].list.length; i++) {

           this.listVP.push({
             id:     vpData[0].list[i].id,
             nombre: vpData[0].list[i].nombre
           })
         }
       })
     }


    // OBTENCION DE LISTA TECNOLOGIA_X
    tecnologias:Array<any> = []
    getListaTecnologia(){
      // this.registroForm.value.idIniciativa = id.toString();
      let parametro: any[]=[
        { queryId:93 }
      ];
      this.modalRegistroService.listaTecnologia(parametro[0]).subscribe(resp =>{

        const dataTecnol:any[] = Array.of(resp)
        // console.log('TECNOLOGIA_X', dataTecnol);

        this.tecnologias = [];
        for (let i = 0; i < dataTecnol[0].list.length; i++) {
          this.tecnologias.push({
            id    : dataTecnol[0].list[i].id,
            nombre: dataTecnol[0].list[i].nombre
          })
        }
      })
    }

    // LISTA DE ESTADOS
    listEstados: Array<any> = [];
    getListEstados(){
      let parametro: any[] = [
        { queryId: 89 }
      ];

      this.modalRegistroService.getListEstados(parametro[0]).subscribe(resp => {
        const estadosData: any[] = Array.of(resp);

        console.log('ESTADOS', estadosData);

        this.listEstados = [];
        for (let i = 0; i < estadosData[0].list.length; i++) {
          this.listEstados.push({
            idEstado:     estadosData[0].list[i].cNombre,
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

          // console.log('GERENCIA', gerencData);

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
        { queryId: 90,
        },
      ];
      this.modalRegistroService.getListNaturaleza(parametro[0]).subscribe((resp) => {

        const dataNaturaleza: any[] = Array.of(resp);
        // console.log('Naturaleza', dataNaturaleza);

            this.naturaleza = [];
            for (let i = 0; i < dataNaturaleza[0].list.length; i++) {
              this.naturaleza.push({
                id    : dataNaturaleza[0].list[i].id,
                nombre: dataNaturaleza[0].list[i].nombre
              })
            }
          });
    }


  // limpiarRegistModal(){
  //   this.dataRegistroEditar.nombre = '';
  //   this.dataRegistroEditar.codigo = '';
  //   this.dataRegistroEditar.vp = '';
  //   this.dataRegistroEditar.gerenciaBenef = '';
  //   this.dataRegistroEditar.estado = '';
  //   this.dataRegistroEditar.poProyecto = '';
  //   this.dataRegistroEditar.responsable = '';
  //   this.dataRegistroEditar.gerenciaBenef = '';
  //   this.dataRegistroEditar.planner = '';
  //   this.dataRegistroEditar.        gerencia_beneficiaria = '';
  //   this.dataRegistroEditar.controllerAprobBc = '';
  //   this.dataRegistroEditar.tecnologia = '';
  //   this.dataRegistroEditar.licencias = '';
  //   this.dataRegistroEditar.naturaleza = '';

  //   this.fechaing                 = ''
  //   this.btnCrearRegistro.nativeElement.disabled = false;
  //   this.cargarRegistro();
  // };

  registros: Array<any> = [];
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
            console.log('REGISTROS_TABLA', data);
            for (let i = 0; i < data[0].list.length; i++) {
              this.registros.push({
              idIniciativa          : data[0].list[i].idIniciativa,
              nombre                : data[0].list[i].nombre,
              codigo                : data[0].list[i].codigo,
              vp                    : data[0].list[i].vp,
              gerencia_solicitante  : data[0].list[i].gerencia_solicitante,
              estado                : data[0].list[i].estado,
              po_proyecto           : data[0].list[i].po_proyecto,
              responsable           : data[0].list[i].responsable,
              gerencia_beneficiaria : data[0].list[i].gerencia_beneficiaria,
              planner               : data[0].list[i].planner,
              controller_ger_ben    : data[0].list[i].controller_ger_ben,
              controller_aprob_bc   : data[0].list[i].controller_aprob_bc,
              tecnologia            : data[0].list[i].tecnologia,
              licencias             : data[0].list[i].licencias,
              naturaleza            : data[0].list[i].naturaleza,
              fecha_creacion        : data[0].list[i].fecha_creacion,
            })
          }
        })
  }

  // @ViewChild('cerrarModal') cerrarModal!: ElementRef;
  // agregarRegistro(){
  //   this.spinner.show();
  //   // let registroIdGerSolc
  //   // if (this.idGerSolc == undefined || this.idGerSolc == 0) {
  //   //   this.idGerSolc  = '';
  //   // } else {
  //   //   registroIdGerSolc = this.idGerSolc
  //   // };

  //   let registroIdInfoVP
  //   if (this.idVP == undefined || this.idVP == 0) {
  //     this.idVP = ''
  //   } else {
  //     registroIdInfoVP = this.idVP
  //   }

  //   // let idGerSolc = registroIdGerSolc;
  //   this.btnCrearRegistro.nativeElement.disabled = true;

  //   let nombre                = this.dataRegistroEditar.nombre;
  //   let codigo                = this.dataRegistroEditar.codigo;
  //   let vp                    = this.dataRegistroEditar.vp;
  //   let gerencia_solicitante  = this.dataRegistroEditar.gerencia_solicitante;
  //   let po_proyecto           = this.dataRegistroEditar.po_proyecto;
  //   let estado                = this.dataRegistroEditar.estado;
  //   let responsable           = this.dataRegistroEditar.responsable;
  //   let gerencia_beneficiaria = this.dataRegistroEditar.gerencia_beneficiaria;
  //   let planner               = this.dataRegistroEditar.planner;
  //   let controller_ger_ben    = this.dataRegistroEditar.controller_ger_ben;
  //   let controller_aprob_bc   = this.dataRegistroEditar.controller_aprob_bc;
  //   let tecnologia            = this.dataRegistroEditar.tecnologia;
  //   let licencias             = this.dataRegistroEditar.licencias;
  //   let naturaleza            = this.dataRegistroEditar.naturaleza;

  //   let fecha_creacion          = this.dataRegistroEditar.fecha_creacion;

  //   let parametro: any[] = [
  //     {queryId: 97,
  //      mapValue: {
  //       "p_cdescripcion"   : nombre  ,
  //       "p_cod_proyecto"   : codigo  ,
  //       "p_id_vp"          : registroIdInfoVP  ,
  //       "p_id_gerencia_sol": gerencia_solicitante  , // revisar y corregir ?
  //       "p_id_estado"      : estado  ,
  //       "p_po_proyecto"    : po_proyecto  ,
  //       "p_responsable"    : responsable  ,
  //       "p_id_gerencia_ben": gerencia_beneficiaria  ,
  //       "p_planner"        : planner  ,
  //       "p_cont_ger_ben"   : controller_ger_ben  ,
  //       "p_cont_apr_bc"    : controller_aprob_bc  ,
  //       "p_id_tecnologia"  : tecnologia  ,
  //       "p_q_licencias"    : licencias  ,
  //       "p_id_naturaleza"  : naturaleza  ,
  //       "p_prob_actual"    : ''  ,
  //       "p_func_robotiz"   : ''  ,
  //       "p_def_alcance"    : ''  ,
  //       "p_riesgo_no_rpa"  : ''  ,
  //       "p_pi"             : ''  ,
  //       "p_qtrx_mes"       : ''  ,
  //       "p_tmo_trx"        : ''  ,
  //       "p_flu_contx"      : ''  ,
  //       "p_user_crea"      : ''  ,
  //       "p_fecha_crea"     : fecha_creacion  ,
  //       "p_user_act"       : ''  ,
  //       "p_fecha_act"      : '' ,
  //       "CONFIG_REG_ID"    : '' ,
  //       "CONFIG_OUT_MSJ_ERROR": '' ,
  //       "CONFIG_OUT_MSJ_EXITO": ''
  //      }
  //     }];

  //     this.modalRegistroService.agregarRegistro(parametro[0]).subscribe(resp => {
  //       console.log('AGREGAR_REG', resp);
  //       const regData: any[] = Array.of(resp);

  //       let msj  = regData[0].exitoMessage;
  //       let msj2 = regData[0].errorMessage;

  //       this.cerrarModal.nativeElement.click();
  //       this.cargarRegistro();

  //     });
  //     this.spinner.hide();
  // }


  cargarRegistroId(){
    this.spinner.show();

    let parametro: any[] = [{
      queryId: 100,
      mapValue: {
        'param_idIniciativa': this.idRegistro
      }
    }];

    this.modalRegistroService.cargarRegistroId(parametro[0]).subscribe( resp => {
      const editData:any[] = Array.of(resp);

      console.log('EDIT',editData );
      for (let i = 0; i < editData[0].list.length; i++) {
        this.dataRegistroEditar.idIniciativa          = editData[0].list[i].idIniciativa ;
        this.dataRegistroEditar.nombre                = editData[0].list[i].nombre ;
        this.dataRegistroEditar.codigo                = editData[0].list[i].codigo ;
        this.dataRegistroEditar.vp                    = editData[0].list[i].vp ;
        this.dataRegistroEditar.gerenciaSolic         = editData[0].list[i].gerencia_solicitante ;
        this.dataRegistroEditar.estado                = editData[0].list[i].estado ;
        this.dataRegistroEditar.poProyecto            = editData[0].list[i].po_proyecto ;
        this.dataRegistroEditar.responsable           = editData[0].list[i].responsable ;
        this.dataRegistroEditar.gerencia_beneficiaria = editData[0].list[i].gerencia_beneficiaria ;
        this.dataRegistroEditar.planner               = editData[0].list[i].planner ;
        this.dataRegistroEditar.        gerencia_beneficiaria
      = editData[0].list[i].controller_ger_ben ;
        this.dataRegistroEditar.controllerAprobBc     = editData[0].list[i].controller_aprob_bc ;
        this.dataRegistroEditar.tecnologia            = editData[0].list[i].tecnologia ;
        this.dataRegistroEditar.licencias             = editData[0].list[i].licencias ;
        this.dataRegistroEditar.naturaleza            = editData[0].list[i].naturaleza ;

        if (editData[0].list[i].fecha_creacion !='null' && editData[0].list[i].fecha_creacion != '') {
          let fechaCrea = editData[0].list[i].fecha_creacion
          const str   = fechaCrea.split('/');
          const year  = Number(str[2]);
          const month = Number(str[1]);
          const date  = Number(str[0]);

          this.dataRegistroEditar.fechaCreacion = this.datePipe.transform(new Date(year, month-1, date), 'yyyy-MM-dd')
          console.log('FECHA_CREA', this.dataRegistroEditar.fechaCreacion);

        }
      }
      this.spinner.hide();
    })
  }


  @ViewChild('btnActualizarRegistro') btnActualizarRegistro!: ElementRef;
  actualizarRegistro(){
    this.spinner.show();
    this.btnActualizarRegistro.nativeElement.disabled = true;

    // let id                    = this.dataRegistroEditar.id;
    let nombre                = this.dataRegistroEditar.nombre;
    let codigo                = this.dataRegistroEditar.codigo;
    let vp                    = this.dataRegistroEditar.vp;
    let gerenciaSolic         = this.dataRegistroEditar.gerenciaSolic;
    let estado                = this.dataRegistroEditar.estado;
    let poProyecto            = this.dataRegistroEditar.poProyecto;
    let responsable           = this.dataRegistroEditar.responsable;
    let gerenciaBenef         = this.dataRegistroEditar.gerenciaBenef;
    let planner               = this.dataRegistroEditar.planner;
    let         gerencia_beneficiaria
      = this.dataRegistroEditar.        gerencia_beneficiaria
;
    let controllerAprobBc     = this.dataRegistroEditar.controllerAprobBc;
    let tecnologia            = this.dataRegistroEditar.tecnologia;
    let licencias             = this.dataRegistroEditar.licencias;
    let naturaleza            = this.dataRegistroEditar.naturaleza;

    let fecha_creacion        = this.dataRegistroEditar.fechaCreacion;

    let parametro: any[] = [{
      queryId: 99 ,
      mapValue: {
        "param_idIniciativa"   : this.idRegistro  ,
        "param_cdescripcion"   : nombre  ,
        "param_cod_proyecto"   : codigo  ,
        // "param_id_vp"          : vp  ,
        "param_id_gerencia_sol": gerenciaSolic  , // revisar y corregir ?
        // "param_id_estado"      : estado  ,
        "param_po_proyecto"    : poProyecto  ,
        "param_responsable"    : responsable  ,
        "param_id_gerencia_ben": gerenciaBenef  ,
        "param_planner"        : planner  ,
        "param_cont_ger_ben"   :         gerencia_beneficiaria
  ,
        "param_cont_apr_bc"    : controllerAprobBc  ,
        "param_id_tecnologia"  : tecnologia  ,
        "param_q_licencias"    : licencias  ,
        "param_id_naturaleza"  : naturaleza  ,
        "param_prob_actual"    : ''  ,
        "param_func_robotiz"   : ''  ,
        "param_def_alcance"    : ''  ,
        "param_riesgo_no_rpa"  : ''  ,
        "param_pi"             : ''  ,
        "param_qtrx_mes"       : ''  ,
        "param_tmo_trx"        : ''  ,
        "param_flu_contx"      : ''  ,
        "param_user_crea"      : ''  ,
        "param_fecha_crea"     : fecha_creacion  ,
        "param_user_act"       : ''  ,
        "param_fecha_act"      : '' ,
        // "CONFIG_REG_ID"        : this.usuario.user.userId,
        "CONFIG_REG_ID"        : '',
        "CONFIG_OUT_MSJ_ERROR" : '' ,
        "CONFIG_OUT_MSJ_EXITO" : ''
      }
    }];

    this.modalRegistroService.actualizarRegistro(parametro[0]).subscribe( resp => {
      this.spinner.hide();

      const data: any[] = Array.of(resp);
      console.log('DATA_ACTUALIZADO', data);

      let msj  = data[0].exitoMessage;
      let msj2 = data[0].errorMessage


    });
    this.btnActualizarRegistro.nativeElement.disabled = false
  }


  regresarRegistro(){
    this.router.navigateByUrl('registro/iniciativa')
  }

}

