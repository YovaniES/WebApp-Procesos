import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';
import { IniciativaService } from 'src/app/core/services/iniciativa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-crear-iniciativa',
  templateUrl: './modal-crear-iniciativa.component.html',
  styleUrls: ['./modal-crear-iniciativa.component.scss']
})
export class ModalCrearIniciativaComponent implements OnInit {

  datosRegistroAgregar = {
    idIniciativa         : '',
    nombre               : '',
    codigo               : '',
    estado               : '',
    po_proyecto          : '',
    gerencia_beneficiaria: '',
    naturaleza           : '',
    fecha_creacion       : '',
  }
  constructor(private iniciativaService: IniciativaService,
              private authService: AuthService,
              private spinner: NgxSpinnerService,
              private dialogRef: MatDialogRef<ModalCrearIniciativaComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any
    ) { }

  ngOnInit(): void {
    this.getListEstados();
    this.getListGerencia();
    this.getListNaturaleza()
  }

  idNaturalezaBuscar: any
  getInfoNaturalezaBuscar(id: any){
    this.idNaturalezaBuscar = id;
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

  crearIniciativa(){
    this.spinner.show();
    let currentUser = this.authService.getUsername();

    let nombre                = this.datosRegistroAgregar.nombre;
    let codigo                = this.datosRegistroAgregar.codigo;
    let po_proyecto           = this.datosRegistroAgregar.po_proyecto;
    let estado                = this.datosRegistroAgregar.estado;
    let gerencia_beneficiaria = this.datosRegistroAgregar.gerencia_beneficiaria;
    let naturaleza            = this.datosRegistroAgregar.naturaleza;
    let fecha_creacion        = this.datosRegistroAgregar.fecha_creacion;

    let parametro: any[] = [
      {queryId: 97,
       mapValue: {
        "p_cdescripcion"      : nombre  ,
        "p_cod_proyecto"      : codigo  ,
        "p_id_estado"         : estado  ,
        "p_po_proyecto"       : po_proyecto  ,
        "p_id_gerencia_ben"   : gerencia_beneficiaria,
        "p_id_naturaleza"     : naturaleza  ,
        "p_prob_actual"       : ''  ,
        "p_func_robotiz"      : ''  ,
        "p_def_alcance"       : ''  ,
        "p_riesgo_no_rpa"     : ''  ,
        "p_pi"                : ''  ,
        "p_qtrx_mes"          : ''  ,
        "p_tmo_trx"           : ''  ,
        "p_flu_contx"         : ''  ,
        "p_user_crea"         : currentUser ,
        "p_fecha_crea"        : fecha_creacion  ,
        "p_user_act"          : ''  ,
        "p_fecha_act"         : ''  ,
        "CONFIG_REG_ID"       : ''  ,
        "CONFIG_OUT_MSG_ERROR": ''  ,
        "CONFIG_OUT_MSG_EXITO": ''
       }
      }];

      this.iniciativaService.crearIniciativa(parametro[0]).subscribe((resp: any) => {
        const regData: any[] = Array.of(resp);

        // Swal.fire('Crear Iniciativa!', `${ resp.nombre } creado correctamente`, 'success');
        Swal.fire({
          title: 'Crear Iniciativa!',
          text : 'Iniciativa creado con éxito',
          icon : 'success',
          confirmButtonText: 'Ok'
          });
        this.close(true);
      });
      this.spinner.hide();
  }

  close(succes?: boolean) {
    this.dialogRef.close(succes);
  }
}
