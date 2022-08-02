import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Estados } from 'src/app/core/interfaces/estados.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { IniciativaService } from 'src/app/core/services/iniciativa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-crear-iniciativa',
  templateUrl: './modal-crear-iniciativa.component.html',
  styleUrls: ['./modal-crear-iniciativa.component.scss'],
})
export class ModalCrearIniciativaComponent implements OnInit {
  userID: number = 0;
  iniciativaForm!: FormGroup;

  constructor(
    private iniciativaService: IniciativaService,
    private authService: AuthService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<ModalCrearIniciativaComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.newForm();
    this.valueChanges();
    this.getListEstados();
    this.getListGerencia();
    this.getListNaturaleza();
    this.getListaTecnologia();
    this.getListaVP();
  }

  newForm() {
    this.iniciativaForm = this.fb.group({
      nombre      : ['RPA-', Validators.required],
      codigo      : ['', Validators.required],
      poProyecto  : ['', Validators.required],
      vp          : ['', Validators.required],
      gerenciaSol : ['', Validators.required],
      gerenciaBen : ['', Validators.required],
      contAprBc   : ['', Validators.required],
      planner     : ['', Validators.required],
      contGerBen  : ['', Validators.required],
      licencias   : ['', Validators.required],
      naturaleza  : ['', Validators.required],
      qtrxMes     : ['', Validators.required],
      tmoTrx      : ['', Validators.required],
      unidadTrx   : ['Minutos', Validators.required],
      pi          : ['', Validators.required],
      fluContx    : ['', Validators.required],
      probActual  : ['', Validators.required],
      funcRobotiz : ['', Validators.required],
      defAlcance  : ['', Validators.required],
      riesgoNoRpa : ['', Validators.required],
    });
  }

  userId() {
    this.authService.getCurrentUser().subscribe((resp) => {
      this.userID = resp.userId;
      // console.log('ID-USER', this.userID);
    });
  }

  valueChanges(){
    this.iniciativaForm.get('nombre')?.valueChanges.subscribe((valor: string) => {
      this.iniciativaForm.patchValue( {nombre: valor.toUpperCase()}, {emitEvent: false});
    });

    this.iniciativaForm.get('codigo')?.valueChanges.subscribe((valor: string) => {
      this.iniciativaForm.patchValue( {codigo: valor.toUpperCase()}, {emitEvent: false});
    })
  }


  estadoInicial: string = '';
  listEstados: Estados[] = [];
  estadosActivoS: Estados[] = [];
  getListEstados() {
    let parametro: any[] = [{ queryId: 89 }];

    this.iniciativaService.getListEstados(parametro[0]).subscribe((resp) => {
      this.listEstados    = resp;   // console.log('ESTADOS', resp);
      this.estadoInicial  = resp.find((estados: Estados) => estados.cNombre === 'Registrado');  // console.log('idEstado', this.estadoInicial);
    });
  }

  naturaleza: any[] = [];
  getListNaturaleza() {
    let parametro: any[] = [{ queryId: 90 }];
    this.iniciativaService.getListNaturaleza(parametro[0]).subscribe((resp: any) => {
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

  crearIniciativa() {
    this.spinner.show();
    let currentUser = this.authService.getUsername();

    const formValues = this.iniciativaForm.getRawValue();

    let parametro: any =  {
        queryId: 97,
        mapValue: {
          p_cdescripcion    : formValues.nombre,
          p_cod_proyecto    : formValues.codigo,
          p_id_vp           : formValues.vp,
          p_id_gerencia_sol : formValues.gerenciaSol,
          p_id_estado       : 1,  //id=1 => estado: REGISTRADO
          p_po_proyecto     : formValues.poProyecto,
          p_id_gerencia_ben : formValues.gerenciaBen,
          p_planner         : formValues.planner,
          p_cont_ger_ben    : formValues.contGerBen,
          p_cont_apr_bc     : formValues.contAprBc,
          p_q_licencias     : formValues.licencias,
          p_id_naturaleza   : formValues.naturaleza,
          p_prob_actual     : formValues.probActual,
          p_func_robotiz    : formValues.funcRobotiz,
          p_def_alcance     : formValues.defAlcance,
          p_riesgo_no_rpa   : formValues.riesgoNoRpa,
          p_pi              : formValues.pi,
          p_qtrx_mes        : formValues.qtrxMes,
          p_tmo_trx         : formValues.tmoTrx + ' ' + formValues.unidadTrx ,
          p_flu_contx       : formValues.fluContx,
          p_user_crea       : currentUser,
          p_fecha_crea      : formValues.fecha_creacion,
          p_user_act        : '',
          p_fecha_act       : '',
          CONFIG_REG_ID     : this.userID,
          CONFIG_OUT_MSG_ERROR: '',
          CONFIG_OUT_MSG_EXITO: '',
        },
      };
    //  console.log('VAOR', this.iniciativaForm.value , parametro);
    this.iniciativaService.crearIniciativa(parametro).subscribe((resp: any) => {
      Swal.fire({
        title: 'Crear Iniciativa!',
        text: `Iniciativa: ${formValues.codigo} , creado con éxito`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      this.close(true);
    });
    this.spinner.hide();
  }

  campoNoValido(campo: string): boolean {
    if (
      this.iniciativaForm.get(campo)?.invalid &&
      this.iniciativaForm.get(campo)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }

  close(succes?: boolean) {
    this.dialogRef.close(succes);
  }
}
