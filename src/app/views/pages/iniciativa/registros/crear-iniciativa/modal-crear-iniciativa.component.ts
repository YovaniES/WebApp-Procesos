import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
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

    this.getListEstados();
    this.getListGerencia();
    this.getListNaturaleza();
    this.getListaTecnologia();
    this.getListaVP();
  }

  newForm() {
    this.iniciativaForm = this.fb.group({
      nombre                : ['', Validators.required],
      codigo                : ['', Validators.required],
      po_proyecto           : ['', Validators.required],
      vp                    : ['', Validators.required],
      gerencia_solicitante  : ['', Validators.required],
      gerencia_beneficiaria : ['', Validators.required],
      contAprBc             : ['', Validators.required],
      tecnologia            : ['', Validators.required],
      naturaleza            : ['', Validators.required],
    });
  }

  userId() {
    this.authService.getCurrentUser().subscribe((resp) => {
      this.userID = resp.userId;
      // console.log('ID-USER', this.userID);
    });
  }

  listEstados: any[] = [];
  getListEstados() {
    let parametro: any[] = [{ queryId: 89 }];

    this.iniciativaService.getListEstados(parametro[0]).subscribe((resp) => {
      this.listEstados = resp;
    });
  }

  listGerencia: any[] = [];
  getListGerencia() {
    let parametro: any[] = [{ queryId: 95 }];

    this.iniciativaService.getListGerencia(parametro[0]).subscribe(resp => {
        this.listGerencia = resp;
      });
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

  naturaleza: any[] = [];
  getListNaturaleza() {
    let parametro: any[] = [{ queryId: 90 }];
    this.iniciativaService.getListNaturaleza(parametro[0]).subscribe((resp: any) => {
        this.naturaleza = resp;
      });
  }

  crearIniciativa() {
    this.spinner.show();
    let currentUser = this.authService.getUsername();

    let nombre                = this.iniciativaForm.value.nombre;
    let codigo                = this.iniciativaForm.value.codigo;
    let po_proyecto           = this.iniciativaForm.value.po_proyecto;
    let gerencia_solicitante  = this.iniciativaForm.value.gerencia_solicitante;
    let gerencia_beneficiaria = this.iniciativaForm.value.gerencia_beneficiaria;
    let vp                    = this.iniciativaForm.value.vp;
    let contAprBc             = this.iniciativaForm.value.contAprBc;
    let tecnologia            = this.iniciativaForm.value.tecnologia;
    let estado                = this.iniciativaForm.value.estado;
    let naturaleza            = this.iniciativaForm.value.naturaleza;
    let fecha_creacion        = this.iniciativaForm.value.fecha_creacion;

    let parametro: any[] = [
      {
        queryId: 97,
        mapValue: {
          p_cdescripcion: nombre,
          p_cod_proyecto: codigo,
          p_po_proyecto: po_proyecto,
          p_id_gerencia_sol: gerencia_solicitante,
          p_id_gerencia_ben: gerencia_beneficiaria,
          p_id_vp: vp,
          p_cont_apr_bc: contAprBc,
          p_id_tecnologia: tecnologia,
          p_id_estado: estado,
          p_id_naturaleza: naturaleza,
          p_prob_actual: '',
          p_func_robotiz: '',
          p_def_alcance: '',
          p_riesgo_no_rpa: '',
          p_pi: '',
          p_qtrx_mes: '',
          p_tmo_trx: '',
          p_flu_contx: '',
          p_user_crea: currentUser,
          p_fecha_crea: fecha_creacion,
          p_user_act: '',
          p_fecha_act: '',
          CONFIG_REG_ID: this.userID,
          CONFIG_OUT_MSG_ERROR: '',
          CONFIG_OUT_MSG_EXITO: '',
        },
      },
    ];

    this.iniciativaService.crearIniciativa(parametro[0]).subscribe((resp) => {
      Swal.fire({
        title: 'Crear Iniciativa!',
        text: 'Iniciativa creado con éxito',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      this.close(true);
    });
    this.spinner.hide();
  }

  close(succes?: boolean) {
    this.dialogRef.close(succes);
  }
}
