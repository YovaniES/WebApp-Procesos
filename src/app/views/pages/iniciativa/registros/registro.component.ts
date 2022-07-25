import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalCrearIniciativaComponent } from './crear-iniciativa/modal-crear-iniciativa.component';
import { ModalActualizarIniciativaComponent } from './actualizar-iniciativa/modal-actualizar-iniciativa.component';
import { IniciativaService } from 'src/app/core/services/iniciativa.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportExcellService } from 'src/app/core/services/export-excell.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],

})
export class RegistroComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  page = 1;
  totalIniciativa: number = 0;
  pageSize = 10;
  pageSizes = [3, 6, 9];

  loadingItem: boolean = false;
  data: any[] = [];
  userID: number = 0;
  filtroForm!: FormGroup;

  responsab:string = '';
  role: FormGroup = this.fb.group(
    {
      idaplicacion: ['1'],
      username    : ['106'],
      password    : ['']
    }
  )

  constructor(
    private iniciativaService: IniciativaService,
    private fb: FormBuilder,
    private authService: AuthService,
    private exportExcellService: ExportExcellService,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe,
    private dialog: MatDialog,
  ) {}


  ngOnInit(): void {
    this.spinner.hide();
    this.newFilfroForm();
    this.buscarOcargarRegistro();
    this.getListEstados();
    this.getListGerencia();
    this.getListNaturaleza();
  }

  newFilfroForm(){
    this.filtroForm = this.fb.group({
      nombre         : [''],
      codigo         : [''],
      estado         : [''],
      gerencia_benef : [''],
      naturaleza     : [''],
      fechaCreaInicio: [''],
      fechaCreaFin   : [''],
    })
  }

  userId() {
    this.authService.getCurrentUser().subscribe((resp) => {
      this.userID = resp.userId;
      // console.log('ID-USER', this.userID);
    });
  };

  listEstados: any[] = [];
  getListEstados(){
    let parametro: any[] = [{ queryId: 89 }];
    this.iniciativaService.getListEstados(parametro[0]).subscribe(resp => {
      this.listEstados = resp
    })
  };

  naturaleza: any[] = [];
  getListNaturaleza() {
    let parametro: any[] = [{ queryId: 90, }];
    this.iniciativaService.getListNaturaleza(parametro[0]).subscribe(resp => {
          this.naturaleza = resp;
          });
  }

  listGerencia: any[] = [];
  getListGerencia() {
    let parametro: any[] = [{ queryId: 93 }];
    this.iniciativaService.getListGerencia(parametro[0]).subscribe(resp => {
        this.listGerencia = resp;
      });
  }

  registros:any[] = [];
  buscarOcargarRegistro(){
    this.blockUI.start("Cargando iniciativas...");
    let parametro: any[] = [{
      "queryId": 96,
      "mapValue": {
        "param_nombre"       : this.filtroForm.value.nombre,
        "param_codigo"       : this.filtroForm.value.codigo,
        "param_id_ger_ben"   : this.filtroForm.value.gerencia_benef,
        "param_id_estado"    : this.filtroForm.value.estado,
        "param_id_naturaleza": this.filtroForm.value.naturaleza,
        "param_user_crea"    : this.authService.getUserNameByRol(),
        "inicio": this.datepipe.transform(this.filtroForm.value.fechaCreaInicio,'yyyy/MM/dd'),
        "fin"   : this.datepipe.transform(this.filtroForm.value.fechaCreaFin,'yyyy/MM/dd'),
      }
    }];
    this.iniciativaService.buscarOcargarRegistro(parametro[0]).subscribe(resp => {
    this.blockUI.stop();

    //  console.log('INIC_O_BUSQ', resp, resp.length);
      this.registros = [];
      this.registros = resp;

      this.spinner.hide();
    });
  }

  exportarRegistro(){
    this.exportExcellService.exportarExcel(this.registros, 'Iniciativa')
  }

  totalfiltro = 0;
  cambiarPagina(event: number) {
    let offset = event*10;
    this.spinner.show();

    if (this.totalfiltro != this.totalIniciativa) {
      this.iniciativaService.buscarOcargarRegistro(offset.toString()).subscribe( resp => {
            // console.log('TABLA', resp);
            this.registros = resp;
            this.spinner.hide();
          });
    } else {
      this.spinner.hide();
    }
      this.page = event;
  }


  eliminarIniciativa(id: any){
    this.spinner.show();

    let parametro:any[] = [{
      queryId: 95,
      mapValue: {
        'param_id_iniciativa' : id ,
        'CONFIG_REGIS_ID'     : this.userID ,
        'CONFIG_OUT_MSG_ERROR': '' ,
        'CONFIG_OUT_MSG_EXITO': ''
      }
    }];
    Swal.fire({
      title: '¿Eliminar Iniciativa?',
      text: `¿Estas seguro que deseas eliminar la iniciativa?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((resp) => {
      if (resp.value) {
        this.iniciativaService.eliminarIniciativa(parametro[0]).subscribe(resp => {

          this.buscarOcargarRegistro();

            Swal.fire({
              title: 'Eliminar Iniciativa',
              text: 'La Iniciativa fue eliminado con éxito',
              icon: 'success',
            });
          });
      }
    });
    this.spinner.hide();
  }

  limpiarFiltro(){
    this.filtroForm.controls['nombre'].setValue('');
    this.filtroForm.controls['codigo'].setValue('');
    this.filtroForm.controls['estado'].setValue('');
    this.filtroForm.controls['gerencia_benef'].setValue('');
    this.filtroForm.controls['naturaleza'].setValue('');
    this.filtroForm.controls['fechaCreaInicio'].setValue('');
    this.filtroForm.controls['fechaCreaFin'].setValue('');

    this.buscarOcargarRegistro();
  };

  crearIniciativa(){
    const dialogRef = this.dialog.open(ModalCrearIniciativaComponent, {width:'65%', height:'85%'});

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.buscarOcargarRegistro()
      }
    })
  }

  editarIniciativa(idIniciativa: any) {
    this.dialog
      .open(ModalActualizarIniciativaComponent, { width: '65%', height: '90%', data: idIniciativa, })
      .afterClosed().subscribe((resp) => {
        if (resp) {
          this.buscarOcargarRegistro();
        }
      });
  }

}


