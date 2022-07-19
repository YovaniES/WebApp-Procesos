import { Component, Inject, OnInit } from '@angular/core';
import { IniciativaService } from 'src/app/core/services/iniciativa.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-iniciativa',
  templateUrl: './modal-actualizar-iniciativa.component.html',
  styleUrls: ['./modal-actualizar-iniciativa.component.scss'],

})
export class ModalActualizarIniciativaComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
 reg: string = 'Regis'
  fechaing:any;
  totalRegistros: number = 0;
  userName: string = '';
  userID: number = 0;

  iniciativaEditForm!: FormGroup

  datosInicCambios = {
      id_motivo: 0,
      dFecha   : new Date,
    }

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
    this.iniciativaForm();
    this.cargarRegistroId();
    this.getListResponsable();
    this.getListGerencia();
    this.getListaVP();
    this.getListNaturaleza();
    this.getListaTecnologia();
    this.getHistoricoCambios(this.data);
    this.getUsuario();
   }

   iniciativaForm(){
    this.iniciativaEditForm = this.fb.group({
      idIniciativa : [''],
      nombre       : [''],
      codigo       : [''],
      vp           : [''],
      gerenciaSol  : [''],
      estado       : [''],
      poProyecto   : [''],
      responsable  : [''],
      gerenciaBen  : [''],
      planner      : [''],
      contGerBen   : [''],
      contAprBc    : [''],
      tecnologia   : [''],
      licencias    : [''],
      naturaleza   : [''],
      probActual   : [''],
      funcRobotiz  : [''],
      defAlcance   : [''],
      riesgoNoRpa  : [''],
      pi           : [''],
      qtrxMes      : [''],
      tmoTrx       : [''],
      fluContx     : [''],
      userCrea     : [''],
      fechaCrea    : [''],
      userAct      : [''],
      fechaAct     : [''],
    });
   }

   getUsuario(){
    this.authService.getCurrentUser().subscribe( resp => {
      this.userName = resp.userName;
      this.userID   = resp.user.userId;
      // console.log('ID-USER', this.userName, this.userID);
    })
   }

  actualizarFechaCreacion(fecha: string){
    this.iniciativaEditForm.controls['fechaCrea'].setValue(this.datePipe.transform(fecha, 'yyyy-MM-dd'));
  }

  listVP: any[] = [];
  getListaVP() {
    let parametro: any[] = [{ queryId: 94 }];
    this.iniciativaService.getListVP(parametro[0]).subscribe(resp => {
        this.listVP = resp
    });
  }

  tecnologias:any[] = []
  getListaTecnologia(){
    let parametro: any[]=[{ queryId:93 }];
    this.iniciativaService.listaTecnologia(parametro[0]).subscribe(resp => {
        this.tecnologias = resp
    })
  }


  getListEstados(){
    let parametro: any[] = [{ queryId: 89 }];
    this.iniciativaService.getListEstados(parametro[0]).subscribe( resp => {
      this.listEstados = resp
    })
  };

  listEstados: any[] = [];
  getListEstadosBypadre(idEstadoPadre: any){
    let parametro: any[] = [{ queryId: 89 }];
   this.iniciativaService.getListEstados(parametro[0], false).subscribe((resp: any) => {

     resp.list.map((estado: any) => { //  console.log('ESTADOS', estado);
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
          id     : resp.list[i].id,
          nombre : resp.list[i].nombre,
        });
      }
    })
  };

  listGerencia: any[] = [];
  getListGerencia() {
    let parametro: any[] = [{ queryId: 95 }];

    this.iniciativaService.getListGerencia(parametro[0]).subscribe(resp => {
        this.listGerencia = resp;
      });
  }


  naturaleza: any[] = [];
  getListNaturaleza() {
    let parametro: any[] = [{ queryId: 90 },
    ];
    this.iniciativaService.getListNaturaleza(parametro[0]).subscribe(resp => {
        this.naturaleza = resp;
        });
  }

  actualizarIniciativa(){
    this.spinner.show();

    let currentUser = this.authService.getUsername();

    let id          = this.iniciativaEditForm.value.idIniciativa;
    let nombre      = this.iniciativaEditForm.value.nombre
    let codigo      = this.iniciativaEditForm.value.codigo
    let vp          = this.iniciativaEditForm.value.vp
    let gerenciaSol = this.iniciativaEditForm.value.gerenciaSol
    let estado      = this.iniciativaEditForm.value.estado
    let poProyecto  = this.iniciativaEditForm.value.poProyecto
    let responsable = this.iniciativaEditForm.value.responsable
    let gerenciaBen = this.iniciativaEditForm.value.gerenciaBen
    let planner     = this.iniciativaEditForm.value.planner
    let contGerBen  = this.iniciativaEditForm.value.contGerBen
    let contAprBc   = this.iniciativaEditForm.value.contAprBc
    let tecnologia  = this.iniciativaEditForm.value.tecnologia
    let licencias   = this.iniciativaEditForm.value.licencias
    let naturaleza  = this.iniciativaEditForm.value.naturaleza
    let probActual  = this.iniciativaEditForm.value.probActual
    let funcRobotiz = this.iniciativaEditForm.value.funcRobotiz
    let defAlcance  = this.iniciativaEditForm.value.defAlcance
    let riesgoNoRpa = this.iniciativaEditForm.value.riesgoNoRpa
    let pi          = this.iniciativaEditForm.value.pi
    let qtrxMes     = this.iniciativaEditForm.value.qtrxMes
    let tmoTrx      = this.iniciativaEditForm.value.tmoTrx
    let fluContx    = this.iniciativaEditForm.value.fluContx
    // let userCrea    = this.iniciativaEditForm.value.userCrea
    let fechaCrea   = this.iniciativaEditForm.value.fechaCrea
    // let userAct     = this.iniciativaEditForm.value.userAct
    let fechaAct    = this.iniciativaEditForm.value.fechaAct

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
      // console.log('DATA_ACTUALIZADO', resp);

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

      // console.log('LISTA-EDITAR', resp );
      for (let i = 0; i < resp.list.length; i++) {

        this.iniciativaEditForm.controls['idIniciativa'].setValue(resp.list[i].idIniciativa);
        this.iniciativaEditForm.controls['nombre'].setValue(resp.list[i].nombre);
        this.iniciativaEditForm.controls['codigo'].setValue(resp.list[i].codigo);
        this.iniciativaEditForm.controls['vp'].setValue(resp.list[i].vp);
        this.iniciativaEditForm.controls['gerenciaSol'].setValue(resp.list[i].gerencia_solicitante);
        this.iniciativaEditForm.controls['estado'].setValue(resp.list[i].estado);
        this.iniciativaEditForm.controls['poProyecto'].setValue(resp.list[i].po_proyecto);
        this.iniciativaEditForm.controls['responsable'].setValue(resp.list[i].responsable);
        this.iniciativaEditForm.controls['gerenciaBen'].setValue(resp.list[i].gerencia_beneficiaria);
        this.iniciativaEditForm.controls['planner'].setValue(resp.list[i].planner);
        this.iniciativaEditForm.controls['contGerBen'].setValue(resp.list[i].controller_ger_ben);
        this.iniciativaEditForm.controls['contAprBc'].setValue(resp.list[i].controller_aprob_bc);
        this.iniciativaEditForm.controls['tecnologia'].setValue(resp.list[i].tecnologia);
        this.iniciativaEditForm.controls['licencias'].setValue(resp.list[i].licencias);
        this.iniciativaEditForm.controls['naturaleza'].setValue(resp.list[i].naturaleza);
        this.iniciativaEditForm.controls['probActual'].setValue(resp.list[i].problema);
        this.iniciativaEditForm.controls['funcRobotiz'].setValue(resp.list[i].robotizacion);
        this.iniciativaEditForm.controls['defAlcance'].setValue(resp.list[i].alcance);
        this.iniciativaEditForm.controls['riesgoNoRpa'].setValue(resp.list[i].riesgo);
        this.iniciativaEditForm.controls['pi'].setValue(resp.list[i].pi);
        this.iniciativaEditForm.controls['qtrxMes'].setValue(resp.list[i].qtrx);
        this.iniciativaEditForm.controls['tmoTrx'].setValue(resp.list[i].tmo);
        this.iniciativaEditForm.controls['fluContx'].setValue(resp.list[i].flujo);

        this.iniciativaEditForm.controls['estado'].value ? this.getListEstadosBypadre(this.iniciativaEditForm.controls['estado'].value.toString()) : this.getListEstados();

        // console.log('PII', this.iniciativaEditForm.controls);.setValue('')
        if (resp.list[i].fecha_creacion !='null' && resp.list[i].fecha_creacion != '') {
          let fechaCrea = resp.list[i].fecha_creacion
          const str   = fechaCrea.split('/');
          const year  = Number(str[2]);
          const month = Number(str[1]);
          const date  = Number(str[0]);

          this.iniciativaEditForm.controls['fechaCrea'].setValue(this.datePipe.transform(new Date(year, month-1, date), 'yyyy-MM-dd'))
        }
      }
      this.spinner.hide();
    })
  }

  agregarIniciativaCambios(){
    let currentUser = this.authService.getUsername();
   let idEstado     = this.iniciativaEditForm.value.estado;
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

    this.iniciativaService.cargarIniciatCambios(parametro[0]).subscribe((resp: any) => {
      this.historicoCambios = resp;
      // this.historicoCambios = [];   console.log('ListHistCambID',resp)
    });
    this.spinner.hide();
  }

  close(success?: boolean){
   this.dialogRef.close(success);
  }
}


