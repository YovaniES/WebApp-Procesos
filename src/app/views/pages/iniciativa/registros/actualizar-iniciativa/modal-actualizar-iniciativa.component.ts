import { Component, Inject, OnInit } from '@angular/core';
import { IniciativaService } from 'src/app/core/services/iniciativa.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Iniciativa } from 'src/app/core/interfaces/registro.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-iniciativa',
  templateUrl: './modal-actualizar-iniciativa.component.html',
  styleUrls: ['./modal-actualizar-iniciativa.component.scss'],

})
export class ModalActualizarIniciativaComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  fechaing:any;
  totalRegistros: number = 0;
  userName: string = '';
  userID: number = 0;
  // dataIniciativaForm!: FormGroup

  dataIniciativa: Iniciativa = {
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
      userCrea     : '',
      fechaCrea    : new Date,
      userAct      : '',
      fechaAct     : ''
  }



  datosInicCambios = {
      id_motivo    : 0,
      dFecha       : new Date,
    }

    // dataIniciativaForm = this.fb.group({
    //   idIniciativa : [''],
    //   nombre       : [''],
    //   codigo       : [''],
    //   vp           : [''],
    //   gerenciaSol  : [''],
    //   estado       : [''],
    //   poProyecto   : [''],
    //   responsable  : [''],
    //   gerenciaBen  : [''],
    //   planner      : [''],
    //   contGerBen   : [''],
    //   contAprBc    : [''],
    //   tecnologia   : [''],
    //   licencias    : [''],
    //   naturaleza   : [''],
    //   probActual   : [''],
    //   funcRobotiz  : [''],
    //   defAlcance   : [''],
    //   riesgoNoRpa  : [''],
    //   pi           : [''],
    //   qtrxMes      : [''],
    //   tmoTrx       : [''],
    //   fluContx     : [''],
    //   userCrea     : [''],
    //   fechaCrea    : [''],
    //   userAct      : [''],
    //   fechaAct     : [''],
    // });

  constructor(
    private iniciativaService: IniciativaService,
    private authService: AuthService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<ModalActualizarIniciativaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    this.cargarRegistroId();
    this.getListResponsable();
    this.getListGerencia();
    this.getListaVP();
    this.getListEstados(); //OBS
    this.getListNaturaleza();
    this.getListaTecnologia();
    this.getHistoricoCambios(this.data);
    this.getUsuario();

   }

   getUsuario(){
    this.authService.getCurrentUser().subscribe( resp => {
      this.userName= resp.userName;
      this.userID = resp.user.userId;
      // console.log('ID-USER', this.userName, this.userID);
    })
   }


  actualizarFechaCreacion(fecha: string){
    this.dataIniciativa.fechaCrea = this.datePipe.transform(fecha, 'yyyy-MM-dd');
  }

  listVP: any[] = [];
  getListaVP() {
    let parametro: any[] = [
      { queryId: 94 },
    ];
    this.iniciativaService.getListVP(parametro[0]).subscribe((resp: any) =>{

      for (let i = 0; i < resp.list.length; i++) {
      this.listVP.push({
          id:     resp.list[i].id,
          nombre: resp.list[i].nombre
        })
      }
    })
  }

  tecnologias:any[] = []
  getListaTecnologia(){
    let parametro: any[]=[
      { queryId:93 }
    ];
    this.iniciativaService.listaTecnologia(parametro[0]).subscribe((resp: any) =>{

      for (let i = 0; i < resp.list.length; i++) {
        this.tecnologias.push({
          id    : resp.list[i].id,
          nombre: resp.list[i].nombre
        })
      }
    })
  }


  estadoInit: any[] = [];
  getListEstados() {
    let parametro: any[] = [
      { queryId: 89,
      },
    ];
    this.iniciativaService.getListEstados(parametro[0]).subscribe((resp:any) => {

      for (let i = 0; i < resp.list.length; i++) {
            this.estadoInit.push({
              idEstado       : resp.list[i].idEstado,
              cNombre        : resp.list[i].cNombre
            })
          }
        });
  }

  listEstados: any[] = [];
  getListEstadosBypadre(idEstadoPadre: any){
    let parametro: any[] = [
      { queryId: 89 }
    ];
   this.iniciativaService.getListEstados(parametro[0]).subscribe((resp:any) => {

     for (let i = 0; i < resp.list.length; i++) {
      this.listEstados.push({
        idEstado       : resp.list[i].idEstado,
        cNombre        : resp.list[i].cNombre
      })
    }

     resp.list.map((estado:any) => { //  console.log('ESTADOS', estado);
      const estadosPadre = estado.idEstadoPadre.split(',')
      // console.log('padre', estadosPadre);

      if (estadosPadre.includes(idEstadoPadre)) {
        this.listEstados.push({
          idEstado: estado.idEstado,
          cNombre : estado.cNombre,
        });
      }
     })
    })
  };

  listResponsable: any[] = [];
  getListResponsable(){
    let parametro: any[] = [
      { queryId: 102 }
    ];
   this.iniciativaService.getListResponsable(parametro[0]).subscribe((resp: any) => {

      for (let i = 0; i < resp.list.length; i++) {
        this.listResponsable.push({
          id     :     resp.list[i].id,
          nombre :     resp.list[i].nombre,
        });
      }
    })
  };

  listGerencia: any[] = [];
  getListGerencia(){
    let parametro: any[] = [
      { queryId: 95 }
    ];
  this.iniciativaService.getListGerencia(parametro[0]).subscribe((resp: any) => {

    for (let i = 0; i < resp.list.length; i++) {
        this.listGerencia.push({
          id:     resp.list[i].id,
          nombre: resp.list[i].nombre,
        });
      }
    })
  };

  naturaleza: any[] = [];
  getListNaturaleza() {
    let parametro: any[] = [
      { queryId: 90,
      },
    ];
    this.iniciativaService.getListNaturaleza(parametro[0]).subscribe((resp:any) => {

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

    let currentUser = this.authService.getUsername();

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
    // let userCrea    = this.dataIniciativa.userCrea
    let fechaCrea   = this.dataIniciativa.fechaCrea
    // let userAct     = this.dataIniciativa.userAct
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
        // "param_responsable"    : responsable  ,
        "param_responsable"    : this.userName ,
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
        "param_user_crea"      : currentUser  ,
        "param_fecha_crea"     : fechaCrea  ,
        "param_user_act"       : this.userName ,
        "param_fecha_act"      : fechaAct ,
        "CONFIG_REG_ID"        : this.userID,
        "CONFIG_OUT_MSJ_ERROR" : '' ,
        "CONFIG_OUT_MSJ_EXITO" : ''
      }
    }];

    this.iniciativaService.actualizarRegistro(parametro[0]).subscribe( resp => {

      this.spinner.hide();

      console.log('DATA_ACTUALIZADO', resp);

      this.cargarRegistroId();
      this.close(true)
      this.getHistoricoCambios(id);

      Swal.fire({
        title: 'Actualizar Iniciativa!',
        text : 'Iniciativa actualizado con éxito',
        icon : 'success',
        confirmButtonText: 'Ok'
        })

      if(estado){
        this.agregarIniciativaCambios()
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

    this.iniciativaService.cargarRegistroId(parametro[0]).subscribe( (resp: any) => {

      console.log('LISTA-EDITAR', resp );
      for (let i = 0; i < resp.list.length; i++) {

        this.dataIniciativa.idIniciativa = resp.list[i].idIniciativa ;
        this.dataIniciativa.nombre       = resp.list[i].nombre ;
        this.dataIniciativa.codigo       = resp.list[i].codigo ;
        this.dataIniciativa.vp           = resp.list[i].vp ;
        this.dataIniciativa.gerenciaSol  = resp.list[i].gerencia_solicitante ;
        this.dataIniciativa.estado       = resp.list[i].estado ;
        this.dataIniciativa.poProyecto   = resp.list[i].po_proyecto ;
        this.dataIniciativa.responsable  = resp.list[i].responsable ;
        this.dataIniciativa.gerenciaBen  = resp.list[i].gerencia_beneficiaria ;
        this.dataIniciativa.planner      = resp.list[i].planner ;
        this.dataIniciativa.contGerBen   = resp.list[i].controller_ger_ben ;
        this.dataIniciativa.contAprBc    = resp.list[i].controller_aprob_bc ;
        this.dataIniciativa.tecnologia   = resp.list[i].tecnologia ;
        this.dataIniciativa.licencias    = resp.list[i].licencias ;
        this.dataIniciativa.naturaleza   = resp.list[i].naturaleza ;

        this.dataIniciativa.probActual   = resp.list[i].problema ;
        this.dataIniciativa.funcRobotiz  = resp.list[i].robotizacion ;
        this.dataIniciativa.defAlcance   = resp.list[i].alcance ;
        this.dataIniciativa.riesgoNoRpa  = resp.list[i].riesgo ;

        this.dataIniciativa.pi           = resp.list[i].pi;
        this.dataIniciativa.qtrxMes      = resp.list[i].qtrx;
        this.dataIniciativa.tmoTrx       = resp.list[i].tmo;
        this.dataIniciativa.fluContx     = resp.list[i].flujo,

        this.getListEstadosBypadre(this.dataIniciativa.estado.toString());

        // console.log('PII', this.dataIniciativa);
        if (resp.list[i].fecha_creacion !='null' && resp.list[i].fecha_creacion != '') {
          let fechaCrea = resp.list[i].fecha_creacion
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
    let currentUser = this.authService.getUsername();
   let idEstado     = this.dataIniciativa.estado ;
   let id_motivo    = this.datosInicCambios.id_motivo ;
   let dFecha       = this.datosInicCambios.dFecha ;
  //  let usuario      = this.datosInicCambios.usuario

   let parametro: any[] = [{
     queryId: 98,
     mapValue: {
	 	 "p_idiniciativa"        : this.data ,
	 	 "p_idEstado"            : idEstado ,
	 	 "p_id_motivo"           : id_motivo ,
	 	 "p_dFecha"              : dFecha ,
	 	 "p_usuario"             : currentUser,
     "@CONFIG_USER_ID"       : this.userID,
     "@CONFIG_OUT_MSG_ERROR" : '' ,
     "@CONFIG_OUT_MSG_EXITO" : ''
     }
   }];

  this.iniciativaService.agregarIniciativaCambios(parametro[0]).subscribe( resp => {
    // console.log('NuevoEstIDGuard', resp);
  })
}

historicoCambios: any[] = [];
getHistoricoCambios(id: number){
let currentUser = this.authService.getUsername();

  this.spinner.show();

    let parametro: any[] = [{
      queryId: 101,
      mapValue: {
        'param_id_iniciativa': this.data
      }
    }];

    this.iniciativaService.cargarIniciatCambios(parametro[0]).subscribe( (resp: any) => {

      // this.historicoCambios = [];   console.log('ListHistCambID',resp)
      for (let i = 0; i < resp.list.length; i++) {
      this.historicoCambios.push({
        id           : resp.list[i].id ,
        idiniciativa : resp.list[i].idiniciativa ,
        cdescripcion : resp.list[i].cdescripcion ,
        estado       : resp.list[i].estado ,
        motivo       : resp.list[i].motivo ,
        fecha_cambio : resp.list[i].fecha_cambio ,
        usuario      : currentUser
        });
      }
    });
    this.spinner.hide();
  }

  close(success?: boolean){
   this.dialogRef.close(success);
  }
}


