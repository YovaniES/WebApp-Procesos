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
  userName: string = '';
  userID: number = 0;
  iniciativaEditForm!: FormGroup

  datosInicCambios = {
      id_motivo: 0,
      dFecha   : new Date,
    }

  role: FormGroup = this.fb.group(
    { idaplicacion: ['1'],
      username    : ['106'],
      password    : ['']
    }
  )

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
    this.getListGerencia();
    this.getListaVP();
    this.getListNaturaleza();
    this.getListaTecnologia();
    this.getHistoricoCambios(this.data);
    this.getUsuario();
    this.getName();
    this.getResponsables();
   }

   responsables!: any[]
   getResponsables(){
    this.iniciativaService.getResponsables(this.role.value).subscribe( (resp: any) => {
      this.responsables = resp;
      // console.log('RESPONSABLES', this.responsables);

    })
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

  listEstados: any[] = [];
  getListEstados(){
    let parametro: any[] = [{ queryId: 89 }];
    this.iniciativaService.getListEstados(parametro[0]).subscribe( resp => {
      this.listEstados = resp
    })
  };

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

  naturaleza: any[] = [];
  getListNaturaleza() {
    let parametro: any[] = [{ queryId: 90 },
    ];
    this.iniciativaService.getListNaturaleza(parametro[0]).subscribe(resp => {
        this.naturaleza = resp;
        });
  }

  tecnologias:any[] = []
  getListaTecnologia(){
    let parametro: any[]=[{ queryId: 91 }];
    this.iniciativaService.listaTecnologia(parametro[0]).subscribe(resp => {
        this.tecnologias = resp
    })
  }

  listVP: any[] = [];
  getListaVP() {
    let parametro: any[] = [{ queryId: 92 }];
    this.iniciativaService.getListVP(parametro[0]).subscribe(resp => {
        this.listVP = resp
    });
  }

  listGerencia: any[] = [];
  getListGerencia() {
    let parametro: any[] = [{ queryId: 93 }];

    this.iniciativaService.getListGerencia(parametro[0]).subscribe(resp => {
        this.listGerencia = resp;
      });
  }

  fullName: string = ''
  getName(){
    this.authService.getCurrentUser().subscribe( resp => {
      this.fullName = `${resp.user.nombres} ${resp.user.apellidoPaterno}`
      // console.log('respons', this.fullName);
    });
  }

  actualizarIniciativa(){
    this.spinner.show();
    this.authService.getCurrentUser().subscribe( resp => {
      this.fullName = `${resp.user.nombres} ${resp.user.apellidoPaterno}`
    });

    const formValues = this.iniciativaEditForm.getRawValue();
    let parametro: any[] = [{
      queryId: 99 ,
      mapValue: {
        "param_idIniciativa"   : formValues.idIniciativa,
        "param_cdescripcion"   : formValues.nombre,
        "param_cod_proyecto"   : formValues.codigo,
        "param_id_vp"          : formValues.vp,
        "param_id_gerencia_sol": formValues.gerenciaSol,
        "param_id_estado"      : formValues.estado,
        "param_po_proyecto"    : formValues.poProyecto,
        "param_responsable"    : formValues.responsable,
        "param_id_gerencia_ben": formValues.gerenciaBen,
        "param_planner"        : formValues.planner,
        "param_cont_ger_ben"   : formValues.contGerBen,
        "param_cont_apr_bc"    : formValues.contAprBc,
        "param_id_tecnologia"  : formValues.tecnologia,
        "param_q_licencias"    : formValues.licencias,
        "param_id_naturaleza"  : formValues.naturaleza,
        "param_prob_actual"    : formValues.probActual,
        "param_func_robotiz"   : formValues.funcRobotiz,
        "param_def_alcance"    : formValues.defAlcance,
        "param_riesgo_no_rpa"  : formValues.riesgoNoRpa,
        "param_pi"             : formValues.pi,
        "param_qtrx_mes"       : formValues.qtrxMes,
        "param_tmo_trx"        : formValues.tmoTrx,
        "param_flu_contx"      : formValues.fluContx,
        "param_user_crea"      : formValues.userCrea,
        "param_fecha_crea"     : formValues.fechaCrea,
        "param_user_act"       : this.userName,
        "param_fecha_act"      : formValues.fechaAc,
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
      this.getHistoricoCambios(formValues.id);

      Swal.fire({
        title: 'Actualizar Iniciativa!',
        text : 'Iniciativa actualizado con éxito',
        icon : 'success',
        confirmButtonText: 'Ok'
        })

      if(formValues.estado){
        this.agregarIniciativaCambios()
      }else{
        this.close(true)
      }
    });
  };

  id = this.data

  estadoInicial: string = '';
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
        this.estadoInicial = resp.list[i].estado;
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
        this.iniciativaEditForm.controls['userCrea'].setValue(resp.list[i].user_crea); // USER_CREA==>

        this.iniciativaEditForm.controls['estado'].value ? this.getListEstadosBypadre(this.iniciativaEditForm.controls['estado'].value.toString()) : this.getListEstados();

        this.validarIfIsGestor();

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

  validarIfIsGestor(){
    if (!this.authService.esUsuarioGestor()) {
      this.iniciativaEditForm.controls['estado'].disable()
      this.iniciativaEditForm.controls['responsable'].disable()
    }
  }

  agregarIniciativaCambios(){
    if (this.estadoInicial != this.iniciativaEditForm.value.estado) {
      let currentUser  = this.authService.getUsername();
      let idEstado     = this.iniciativaEditForm.value.estado;
      let id_motivo    = this.datosInicCambios.id_motivo ;
      let dFecha       = this.datosInicCambios.dFecha ;
      let parametro: any[] = [{
        queryId: 98,
        mapValue: {
         "p_idiniciativa"        : this.data ,
         "p_idEstado"            : idEstado ,
         "p_id_motivo"           : id_motivo ,
         "p_dFecha"              : dFecha ,
         "p_usuario"             : currentUser,
        "@CONFIG_USER_ID"        : this.userID,
        "@CONFIG_OUT_MSG_ERROR"  : '' ,
        "@CONFIG_OUT_MSG_EXITO"  : ''
        }
      }];
      // console.log('EST', this.estadoInicial, this.iniciativaEditForm.value);
      this.iniciativaService.agregarIniciativaCambios(parametro[0]).subscribe( resp => {
     })
    }
  }

  historicoCambios: any[] = [];
  getHistoricoCambios(id: number){
  // let currentUser = this.authService.getUsername();
  this.spinner.show();
    let parametro: any[] = [{
      queryId: 94,
      mapValue: {
        'param_id_iniciativa': this.data
      }
    }];

    this.iniciativaService.cargarIniciatCambios(parametro[0]).subscribe((resp: any) => {
      this.historicoCambios = resp;

      // this.historicoCambios = [];
      // console.log('ListHistCambID', resp)
    });
    this.spinner.hide();
  }

  close(success?: boolean){
   this.dialogRef.close(success);
  }
}


