import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ModalRegistroService } from 'src/app/core/services/modalRegistro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface EditarRegistro {
  idIniciativa  : any,
  nombre        : any,
  codigo        : any,
  vp            : any,
  gerenciaSol   : any,
  estado        : any,
  poProyecto    : any,
  responsable   : any,
  gerenciaBen   : any,
  planner       : any,
  contGerBen    : any,
  contAprBc     : any,
  tecnologia    : any,
  licencias     : any,
  naturaleza    : any,
  probActual    : any,
  funcRobotiz   : any,
  defAlcance    : any,
  riesgoNoRpa   : any,
  pi            : any,
  qtrxMes       : any,
  tmoTrx        : any,
  fluContx      : any,
  userCrea      : any,
  fechaCrea     : any,
  userAct       : any,
  fechaAct      : any,
}

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.scss'],
})
export class ModalRegistroComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

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

  iniciativaCambios = {
    id            :'0',
    estado        :'0',
    motivo        :'0',
    fecha_cambio  :'0',
    usuario       :'0'
  }

  dataRegistroEditar: EditarRegistro= {
      idIniciativa : 0,
      nombre       : '',
      codigo       : '',
      vp           : 0,
      gerenciaSol  : 0,
      estado       : 0,
      poProyecto   : '',
      responsable  : '',
      gerenciaBen  : 0,
      planner      : '',
      contGerBen   : '',
      contAprBc    : '',
      tecnologia   : 0,
      licencias    : 0,
      naturaleza   : 0,
      probActual   : '',
      funcRobotiz  : '',
      defAlcance   : '',
      riesgoNoRpa  : '',
      pi           : 0,
      qtrxMes      : '',
      tmoTrx       : '',
      fluContx     : 0,
      userCrea     : 'Jhon Soto',
      fechaCrea    : new Date,
      userAct      : '',
      fechaAct     : ''
  }


  constructor(
    private modalRegistroService: ModalRegistroService,
    private spinner: NgxSpinnerService,
    public datePipe: DatePipe,
    private activateRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<ModalRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.usuario = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe( params => {
      console.log('PARAM', params);

      this.idRegistro = params.get('idRegistro');
      // this.cargarRegistro();
      this.cargarRegistroId();

      this.getListEstados();
      this.getListGerencia();
      this.getListaVP();
      this.getListNaturaleza();
      this.getListaTecnologia();
    });

    this.cargarIniciatCambios()

   }

  dataIniciativaCambios: Array<any> = [];
  cargarIniciatCambios(){
    this.blockUI.start('Cargando lista de cambios ...');

    let parametro: any[] = [{
      queryId: 91
    }];

    this.modalRegistroService.cargarIniciatCambios(parametro[0]).subscribe( resp => {
      this.blockUI.stop();
      const dataCambios: any[] = Array.of(resp);

      console.log('CAMBIOS', dataCambios);

      this.dataIniciativaCambios = [];

      for (let i = 0; i < dataCambios[0].list.length; i++) {
        this.dataIniciativaCambios.push({
          id           : dataCambios[0].list[i].id ,
          cdescripcion : dataCambios[0].list[i].cdescripcion ,
          estado       : dataCambios[0].list[i].estado ,
          motivo       : dataCambios[0].list[i].motivo ,
          fecha_cambio : dataCambios[0].list[i].fecha_cambio ,
          usuario      : dataCambios[0].list[i].usuario ,
        })

      }
    })
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
    this.dataRegistroEditar.fechaCrea = this.datePipe.transform(fecha, 'yyyy-MM-dd');
  }

     // LISTA DE VP PARA EL MODAL
     listVP: Array<any> = [];
     getListaVP() {
       let parametro: any[] = [
         { queryId: 94 },
       ];

       this.modalRegistroService.getListVP(parametro[0]).subscribe(resp =>{
         const vpData: any[] = Array.of(resp);
        //  console.log('VP', vpData);

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
      this.modalRegistroService.getListNaturaleza(parametro[0]).subscribe((resp:any) => {

        // const dataNaturaleza: any[] = Array.of(resp);
        // console.log('Naturaleza', dataNaturaleza);

            this.naturaleza = [];
            for (let i = 0; i < resp.list.length; i++) {
              this.naturaleza.push({
                id            : resp.list[i].id,
                id_naturaleza : resp.list[i].id_naturaleza,
                nombre        : resp.list[i].nombre
              })
            }
          });
    }

  cargarRegistroId(){
    this.spinner.show();

    let parametro: any[] = [{
      queryId: 100,
      mapValue: {
        'param_idIniciativa': this.data
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
        this.dataRegistroEditar.gerenciaSol           = editData[0].list[i].gerencia_solicitante ;
        this.dataRegistroEditar.estado                = editData[0].list[i].estado ;
        this.dataRegistroEditar.poProyecto            = editData[0].list[i].po_proyecto ;
        this.dataRegistroEditar.responsable           = editData[0].list[i].responsable ;
        this.dataRegistroEditar.gerenciaBen           = editData[0].list[i].gerencia_beneficiaria ;
        this.dataRegistroEditar.planner               = editData[0].list[i].planner ;
        this.dataRegistroEditar.contGerBen            = editData[0].list[i].controller_ger_ben ;
        this.dataRegistroEditar.contAprBc             = editData[0].list[i].controller_aprob_bc ;
        this.dataRegistroEditar.tecnologia            = editData[0].list[i].tecnologia ;
        this.dataRegistroEditar.licencias             = editData[0].list[i].licencias ;
        this.dataRegistroEditar.naturaleza            = editData[0].list[i].naturaleza ;

        if (editData[0].list[i].fecha_creacion !='null' && editData[0].list[i].fecha_creacion != '') {
          let fechaCrea = editData[0].list[i].fecha_creacion
          const str   = fechaCrea.split('/');
          const year  = Number(str[2]);
          const month = Number(str[1]);
          const date  = Number(str[0]);

          this.dataRegistroEditar.fechaCrea = this.datePipe.transform(new Date(year, month-1, date), 'yyyy-MM-dd')
          // console.log('FECHA_CREA', this.dataRegistroEditar.fechaCrea);
          // console.log('GERBEN', this.dataRegistroEditar.gerenciaBen);
          // console.log('estado', this.dataRegistroEditar.estado);
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
    // let nombre                = this.dataRegistroEditar.nombre;
    // let codigo                = this.dataRegistroEditar.codigo;
    // let vp                    = this.dataRegistroEditar.vp;
    // let gerenciaSolic         = this.dataRegistroEditar.gerenciaSolic;
    // let estado                = this.dataRegistroEditar.estado;
    // let poProyecto            = this.dataRegistroEditar.poProyecto;
    // let responsable           = this.dataRegistroEditar.responsable;
    // let gerenciaBenef         = this.dataRegistroEditar.gerenciaBenef;
    // let planner               = this.dataRegistroEditar.planner;
    // let gerencia_beneficiaria = this.dataRegistroEditar.gerencia_beneficiaria;
    // let controllerAprobBc     = this.dataRegistroEditar.controllerAprobBc;
    // let tecnologia            = this.dataRegistroEditar.tecnologia;
    // let licencias             = this.dataRegistroEditar.licencias;
    // let naturaleza            = this.dataRegistroEditar.naturaleza;

    // let fecha_creacion        = this.dataRegistroEditar.fechaCreacion;



    // let idIniciativa  =
    let id                    = this.dataRegistroEditar.idIniciativa;
    let nombre      = this.dataRegistroEditar.nombre
    let codigo      = this.dataRegistroEditar.codigo
    let vp          = this.dataRegistroEditar.vp
    let gerenciaSol = this.dataRegistroEditar.gerenciaSol
    let estado      = this.dataRegistroEditar.estado
    let poProyecto  = this.dataRegistroEditar.poProyecto
    let responsable = this.dataRegistroEditar.responsable
    let gerenciaBen = this.dataRegistroEditar.gerenciaBen
    let planner     = this.dataRegistroEditar.planner
    let contGerBen  = this.dataRegistroEditar.contGerBen
    let contAprBc   = this.dataRegistroEditar.contAprBc
    let tecnologia  = this.dataRegistroEditar.tecnologia
    let licencias   = this.dataRegistroEditar.licencias
    let naturaleza  = this.dataRegistroEditar.naturaleza
    let probActual  = this.dataRegistroEditar.probActual
    let funcRobotiz = this.dataRegistroEditar.funcRobotiz
    let defAlcance  = this.dataRegistroEditar.defAlcance
    let riesgoNoRpa = this.dataRegistroEditar.riesgoNoRpa
    let pi          = this.dataRegistroEditar.pi
    let qtrxMes     = this.dataRegistroEditar.qtrxMes
    let tmoTrx      = this.dataRegistroEditar.tmoTrx
    let fluContx    = this.dataRegistroEditar.fluContx
    let userCrea    = this.dataRegistroEditar.userCrea
    let fechaCrea   = this.dataRegistroEditar.fechaCrea
    let userAct     = this.dataRegistroEditar.userAct
    let fechaAct    = this.dataRegistroEditar.fechaAct

    let parametro: any[] = [{
      queryId: 99 ,
      mapValue: {
        "param_idIniciativa"   : id  ,
        "param_cdescripcion"   : nombre  ,
        "param_cod_proyecto"   : codigo  ,
        "param_id_vp"          : vp  ,
        "param_id_gerencia_sol": gerenciaSol  ,
        "param_id_estado"      : estado  ,
        "param_po_proyecto"    : poProyecto  ,
        "param_responsable"    : responsable  ,
        "param_id_gerencia_ben": gerenciaBen  ,
        "param_planner"        : planner  ,
        "param_cont_ger_ben"   : contGerBen  ,
        "param_cont_apr_bc"    : contAprBc  ,
        "param_id_tecnologia"  : tecnologia  ,
        "param_q_licencias"    : licencias  ,
        "param_id_naturaleza"  : naturaleza  ,
        "param_prob_actual"    : probActual  ,
        "param_func_robotiz"   : funcRobotiz  ,
        "param_def_alcance"    : defAlcance  ,
        "param_riesgo_no_rpa"  : riesgoNoRpa  ,
        // "param_pi"             : pi  ,
        "param_qtrx_mes"       : qtrxMes  ,
        "param_tmo_trx"        : tmoTrx  ,
        // "param_flu_contx"      : fluContx  ,
        "param_user_crea"      : userCrea  ,
        "param_fecha_crea"     : fechaCrea  ,
        "param_user_act"       : userAct  ,
        "param_fecha_act"      : fechaAct ,
        // "CONFIG_REG_ID"        : this.usuario.user.userId,
        "CONFIG_REG_ID"        : 100,
        "CONFIG_OUT_MSJ_ERROR" : '' ,
        "CONFIG_OUT_MSJ_EXITO" : ''
      }
    }];

    this.modalRegistroService.actualizarRegistro(parametro[0]).subscribe( resp => {
      this.spinner.hide();

      const data: any[] = Array.of(resp);
      console.log('DATA_ACTUALIZADO', data);

      this.cargarRegistroId();
      this.regresarRegistro(true)

      let msj  = data[0].exitoMessage;
      let msj2 = data[0].errorMessage
      if(estado){
        // hhhh(this.idRegistro, estado);
      }else{
        this.regresarRegistro(true)
      }

    });
    // this.btnActualizarRegistro.nativeElement.disabled = false

  }


//   asdsad(iniciativa: number, estado:string){
// const peticion = {
//   idEstado : estado,
//   idIniciativa: iniciativa
// }
// iniciativa.gua(peticion).subscribe(res=>{
//   this.regresarRegistro(true)

// })

//   }

  regresarRegistro(success?: boolean){
    // this.router.navigateByUrl('registro/iniciativa')
    this.dialogRef.close(success);
  }

}



