import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalRegistroService } from 'src/app/core/services/modalRegistro.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.scss'],
})
export class ModalRegistroComponent implements OnInit {
  @ViewChild('btnRegistrarRegistro') btnRegistrarRegistro!: ElementRef;

  fechaing:any;
  totalRegistros: number = 0;



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


  datosRegistro = {
    idIniciativa         : '',
    nombre               : '',
    codigo               : '',
    vp                   : '',
    gerencia_solicitante : '',
    estado               : '',
    po_proyecto          : '',
    responsable          : '',
    gerencia_beneficiaria: '',
    planner              : '',
    controller_ger_ben   : '',
    controller_aprob_bc  : '',
    tecnologia           : '',
    licencias            : '',
    naturaleza           : '',
    fecha_creacion         : ''
  }


  constructor(
    private modalRegistroService: ModalRegistroService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.cargarRegistro();

    this.getListEstados();
    this.getListGerencia();
    this.getListaVP();
    this.getListNaturaleza();
    this.getListaTecnologia();
   }


   getInfoEstados(id: any){
  }

  getInfoTecnologia(id: any){
  }

  getInfoNaturaleza(id:any){
  }

  idVP: any
  getInfoVP(id: any){
    this.idVP = id
  }

  // ID MODAL

  idGerSol: any;
  getInfoGerSol(id: any){
    this.idGerSol = id
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
        console.log('TECNOLOGIA_X', dataTecnol);

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

          console.log('GERENCIA', gerencData);

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
        console.log('Naturaleza', dataNaturaleza);

            this.naturaleza = [];
            for (let i = 0; i < dataNaturaleza[0].list.length; i++) {
              this.naturaleza.push({
                id    : dataNaturaleza[0].list[i].id,
                nombre: dataNaturaleza[0].list[i].nombre
              })
            }
          });
    }


  limpiarRegistModal(){
    this.datosRegistro.nombre = '';
    this.datosRegistro.codigo = '';
    this.datosRegistro.vp = '';
    this.datosRegistro.gerencia_solicitante = '';
    this.datosRegistro.estado = '';
    this.datosRegistro.po_proyecto = '';
    this.datosRegistro.responsable = '';
    this.datosRegistro.gerencia_beneficiaria = '';
    this.datosRegistro.planner = '';
    this.datosRegistro.controller_ger_ben = '';
    this.datosRegistro.controller_aprob_bc = '';
    this.datosRegistro.tecnologia = '';
    this.datosRegistro.licencias = '';
    this.datosRegistro.naturaleza = '';

    this.fechaing                 = ''
    this.btnRegistrarRegistro.nativeElement.disabled = false;
    this.cargarRegistro();
  };

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
              fecha_creacion            : data[0].list[i].fecha_creacion,
            })
          }
        })
  }

  @ViewChild('cerrarModal') cerrarModal!: ElementRef;
  agregarRegistro(){
    this.spinner.show();

    // let registroIdGerSolc
    // if (this.idGerSolc == undefined || this.idGerSolc == 0) {
    //   this.idGerSolc  = '';
    // } else {
    //   registroIdGerSolc = this.idGerSolc
    // };

    let registroIdInfoVP
    if (this.idVP == undefined || this.idVP == 0) {
      this.idVP = ''
    } else {
      registroIdInfoVP = this.idVP
    }

    // let idGerSolc = registroIdGerSolc;

    this.btnRegistrarRegistro.nativeElement.disabled = true;

    let nombre                = this.datosRegistro.nombre;
    let codigo                = this.datosRegistro.codigo;
    let vp                    = this.datosRegistro.vp;

    let gerencia_solicitante  = this.datosRegistro.gerencia_solicitante;
    let po_proyecto           = this.datosRegistro.po_proyecto;
    let estado                = this.datosRegistro.estado;
    let responsable           = this.datosRegistro.responsable;
    let gerencia_beneficiaria = this.datosRegistro.gerencia_beneficiaria;
    let planner               = this.datosRegistro.planner;
    let controller_ger_ben    = this.datosRegistro.controller_ger_ben;
    let controller_aprob_bc   = this.datosRegistro.controller_aprob_bc;
    let tecnologia            = this.datosRegistro.tecnologia;
    let licencias             = this.datosRegistro.licencias;
    let naturaleza            = this.datosRegistro.naturaleza;

    let fecha_creacion          = this.datosRegistro.fecha_creacion;

    let parametro: any[] = [
      {queryId: 97,
       mapValue: {
        "p_cdescripcion"   : nombre  ,
        "p_cod_proyecto"   : codigo  ,
        "p_id_vp"          : registroIdInfoVP  ,
        "p_id_gerencia_sol": gerencia_solicitante  , // revisar y corregir ?
        "p_id_estado"      : estado  ,
        "p_po_proyecto"    : po_proyecto  ,
        "p_responsable"    : responsable  ,
        "p_id_gerencia_ben": gerencia_beneficiaria  ,
        "p_planner"        : planner  ,
        "p_cont_ger_ben"   : controller_ger_ben  ,
        "p_cont_apr_bc"    : controller_aprob_bc  ,
        "p_id_tecnologia"  : tecnologia  ,
        "p_q_licencias"    : licencias  ,
        "p_id_naturaleza"  : naturaleza  ,
        "p_prob_actual"    : ''  ,
        "p_func_robotiz"   : ''  ,
        "p_def_alcance"    : ''  ,
        "p_riesgo_no_rpa"  : ''  ,
        "p_pi": ''  ,
        "p_qtrx_mes": ''  ,
        "p_tmo_trx": ''  ,
        "p_flu_contx": ''  ,
        "p_user_crea": ''  ,
        "p_fecha_crea": fecha_creacion  ,
        "p_user_act": ''  ,
        "p_fecha_act": '' ,
        "CONFIG_REG_ID": '' ,
        "CONFIG_OUT_MSJ_ERROR": '' ,
        "CONFIG_OUT_MSJ_EXITO": ''
       }
      }];

      this.modalRegistroService.agregarRegistro(parametro[0]).subscribe(resp => {
        console.log('AGREGAR_REG', resp);
        const regData: any[] = Array.of(resp);

        let msj  = regData[0].exitoMessage;
        let msj2 = regData[0].errorMessage;

        this.cerrarModal.nativeElement.click();
        this.cargarRegistro();

      });
      this.spinner.hide();
  }


}
