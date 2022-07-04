import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ModalRegistroService } from 'src/app/core/services/modalRegistro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

export interface IniciativaInterface {
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
  templateUrl: './modal-actualizar-registro.component.html',
  styleUrls: ['./modal-actualizar-registro.component.scss'],

})
export class ModalActualizarRegistroComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  fechaing:any;
  totalRegistros: number = 0;
  usuario: any;
  idRegistro: any = 0;

  dataIniciativa: IniciativaInterface= {
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
      pi           : 1,
      qtrxMes      : '',
      tmoTrx       : '',
      fluContx     : 0,
      userCrea     : 'Jhon Soto',
      fechaCrea    : new Date,
      userAct      : '',
      fechaAct     : ''
  }

  datosInicCambios = {
      id           : 0,
      idiniciativa : '',
      idEstado     : '',
      id_motivo    : 0,
      dFecha       : new Date,
      usuario      : '',
    }


  constructor(
    private modalRegistroService: ModalRegistroService,
    private spinner: NgxSpinnerService,
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<ModalActualizarRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.usuario = JSON.parse(localStorage.getItem('currentUser'))
  }
  id:any = 0;
  ngOnInit() {
    this.cargarRegistroId();
    // this.getListEstados();
    this.getListGerencia();
    this.getListaVP();
    this.getListNaturaleza();
    this.getListaTecnologia();

    this.getHistoricoCambios(this.data);
    // this.getHistoricoCambios(this.id);

    // this.agregarHistoricoCambios(this.data)
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
    this.dataIniciativa.fechaCrea = this.datePipe.transform(fecha, 'yyyy-MM-dd');
  }

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
  tecnologias:Array<any> = []
  getListaTecnologia(){
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
      { queryId: 90,
      },
    ];
    this.modalRegistroService.getListNaturaleza(parametro[0]).subscribe((resp:any) => {
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



  actualizarIniciativa(){
    this.spinner.show();

    let id          = this.dataIniciativa.idIniciativa;
    let nombre      = this.dataIniciativa.nombre
    let codigo      = this.dataIniciativa.codigo
    let vp          = this.dataIniciativa.vp
    let gerenciaSol = this.dataIniciativa.gerenciaSol
    let estado      = this.dataIniciativa.estado
    let poProyecto  = this.dataIniciativa.poProyecto
    let responsable = this.dataIniciativa.responsable
    let gerenciaBen = this.dataIniciativa.gerenciaBen
    let planner     = this.dataIniciativa.planner
    let contGerBen  = this.dataIniciativa.contGerBen
    let contAprBc   = this.dataIniciativa.contAprBc
    let tecnologia  = this.dataIniciativa.tecnologia
    let licencias   = this.dataIniciativa.licencias
    let naturaleza  = this.dataIniciativa.naturaleza
    let probActual  = this.dataIniciativa.probActual
    let funcRobotiz = this.dataIniciativa.funcRobotiz
    let defAlcance  = this.dataIniciativa.defAlcance
    let riesgoNoRpa = this.dataIniciativa.riesgoNoRpa
    let pi          = this.dataIniciativa.pi
    let qtrxMes     = this.dataIniciativa.qtrxMes
    let tmoTrx      = this.dataIniciativa.tmoTrx
    let fluContx    = this.dataIniciativa.fluContx
    let userCrea    = this.dataIniciativa.userCrea
    let fechaCrea   = this.dataIniciativa.fechaCrea
    let userAct     = this.dataIniciativa.userAct
    let fechaAct    = this.dataIniciativa.fechaAct

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
        "param_pi"             : pi  ,
        "param_qtrx_mes"       : qtrxMes  ,
        "param_tmo_trx"        : tmoTrx  ,
        "param_flu_contx"      : fluContx  ,
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
      this.close(true)
      this.getHistoricoCambios(id);

      let msj  = data[0].exitoMessage;
      let msj2 = data[0].errorMessage
      if(estado){
        this.agregarIniciativaCambios()
        // this.obtenerCambiosPorIniciativa(id);

      }else{
        this.close(true)
      }


    });
  };


  cargarRegistroId(){
    this.spinner.show();

    let parametro: any[] = [{
      queryId: 100,
      mapValue: {'param_idIniciativa': this.data}
    }];

    this.modalRegistroService.cargarRegistroId(parametro[0]).subscribe( resp => {
      const editData:any[] = Array.of(resp);

      console.log('EDITX',editData );
      for (let i = 0; i < editData[0].list.length; i++) {

        this.dataIniciativa.idIniciativa = editData[0].list[i].idIniciativa ;
        this.dataIniciativa.nombre       = editData[0].list[i].nombre ;
        this.dataIniciativa.codigo       = editData[0].list[i].codigo ;
        this.dataIniciativa.vp           = editData[0].list[i].vp ;
        this.dataIniciativa.gerenciaSol  = editData[0].list[i].gerencia_solicitante ;
        this.dataIniciativa.estado       = editData[0].list[i].estado ;
        this.dataIniciativa.poProyecto   = editData[0].list[i].po_proyecto ;
        this.dataIniciativa.responsable  = editData[0].list[i].responsable ;
        this.dataIniciativa.gerenciaBen  = editData[0].list[i].gerencia_beneficiaria ;
        this.dataIniciativa.planner      = editData[0].list[i].planner ;
        this.dataIniciativa.contGerBen   = editData[0].list[i].controller_ger_ben ;
        this.dataIniciativa.contAprBc    = editData[0].list[i].controller_aprob_bc ;
        this.dataIniciativa.tecnologia   = editData[0].list[i].tecnologia ;
        this.dataIniciativa.licencias    = editData[0].list[i].licencias ;
        this.dataIniciativa.naturaleza   = editData[0].list[i].naturaleza ;

        this.dataIniciativa.probActual   = editData[0].list[i].problema ;
        this.dataIniciativa.funcRobotiz  = editData[0].list[i].robotizacion ;
        this.dataIniciativa.defAlcance   = editData[0].list[i].alcance ;
        this.dataIniciativa.riesgoNoRpa  = editData[0].list[i].riesgo ;

        this.dataIniciativa.pi           = editData[0].list[i].pi;
        this.dataIniciativa.qtrxMes      = editData[0].list[i].qtrx;
        this.dataIniciativa.tmoTrx       = editData[0].list[i].tmo;
        this.dataIniciativa.fluContx     = editData[0].list[i].flujo,

        this.getListEstados();

        console.log('PII', this.dataIniciativa);

        if (editData[0].list[i].fecha_creacion !='null' && editData[0].list[i].fecha_creacion != '') {
          let fechaCrea = editData[0].list[i].fecha_creacion
          const str   = fechaCrea.split('/');
          const year  = Number(str[2]);
          const month = Number(str[1]);
          const date  = Number(str[0]);

          this.dataIniciativa.fechaCrea = this.datePipe.transform(new Date(year, month-1, date), 'yyyy-MM-dd')
        }
      }
      this.spinner.hide();
    })
  }


  agregarIniciativaCambios(){
   // let idiniciativa = this.dataRegistroEditar.idIniciativa ;
   let idEstado     = this.dataIniciativa.estado ;

   let id_motivo    = this.datosInicCambios.id_motivo ;
   let dFecha       = this.datosInicCambios.dFecha ;
   let usuario      = this.datosInicCambios.usuario

   let parametro: any[] = [{
     queryId:98,
     mapValue: {
	 	 "p_idiniciativa"        : this.data ,
	 	 "p_idEstado"            : parseInt(idEstado) ,
	 	 "p_id_motivo"           : id_motivo ,
	 	 "p_dFecha"              : dFecha ,
	 	 "p_usuario"             : usuario,
     "@CONFIG_USER_ID"       : '' ,
     "@CONFIG_OUT_MSG_ERROR" : '' ,
     "@CONFIG_OUT_MSG_EXITO" : ''
     }
   }];

  this.modalRegistroService.agregarIniciativaCambios(parametro[0]).subscribe( resp => {
    const newEstatoData: any[] = Array.of(resp);
    console.log('NuevoEstIDGuard', newEstatoData);

  })
}

estados:Array<any> = [];
getCambiosEstados(){
  this.estados = [];
  this.modalRegistroService.getCambiosEstados().subscribe(resp => {
    let estadosData: any = [];
    estadosData = resp;

    console.log('ESTADOS=>', estadosData);

    estadosData.forEach((element: { padre: string | null; }) => {

      if(element.padre != null){
        let padresElemento = element.padre.split(",");
            console.log('EST-PADRE',padresElemento);

        padresElemento.forEach((padre: string) => {
          if(padre.localeCompare(this.dataIniciativa.estado) == 0){
            console.log('Elemento-Padre',element.padre);
            this.estados.push(element);
          }
        });
      }
    });

  });
}


historicoCambios: Array<any> = [];
getHistoricoCambios(id: number){
  this.spinner.show();

    let parametro: any[] = [{
      queryId: 101,
      mapValue: {
        'param_id_iniciativa': this.data
      }
    }];

    this.modalRegistroService.cargarIniciatCambios(parametro[0]).subscribe( resp => {
      const data:any[] = Array.of(resp);

      this.historicoCambios = [];   console.log('ListHistCambID',data );

      for (let i = 0; i < data[0].list.length; i++) {
      this.historicoCambios.push({
        id           : data[0].list[i].id ,
        idiniciativa : data[0].list[i].idiniciativa ,
        cdescripcion : data[0].list[i].cdescripcion ,
        estado       : data[0].list[i].estado ,
        motivo       : data[0].list[i].motivo ,
        fecha_cambio : data[0].list[i].fecha_cambio ,
        usuario      : data[0].list[i].usuario ,
        });
      }
    });
    this.spinner.hide();
  }


  close(success?: boolean){
   this.dialogRef.close(success);
  }
}

