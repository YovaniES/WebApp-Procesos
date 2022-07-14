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

  totalRegistros: number = 0;
  loadingItem: boolean = false;
  data: any[] = [];
  userID: number = 0;

  filtro = {
      nombre          : '',
      codigo          : '',
      estado          : '',
      gerencia_benef  : '',
      naturaleza      : '',
      fechaCreaInicio : '',
      fechaCreaFin    : '',
    };


  constructor(
    private iniciativaService: IniciativaService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.spinner.hide();

    this.cargarRegistro();
    this.getListEstados();
    this.getListGerencia();
    this.getListNaturaleza();
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

  listGerencia: any[] = [];
  getListGerencia() {
    let parametro: any[] = [{ queryId: 95 }];
    this.iniciativaService.getListGerencia(parametro[0]).subscribe(resp => {
        this.listGerencia = resp;
      });
  }


  naturaleza: any[] = [];
  getListNaturaleza() {
    let parametro: any[] = [{ queryId: 90, }];
    this.iniciativaService.getListNaturaleza(parametro[0]).subscribe(resp => {
          this.naturaleza = resp;
          });
  }

  totalFiltroEncontrado: number = 0;
  buscarRegistro(){
    this.totalRegistros = 0;
    this.blockUI.start("Buscando iniciativas...");
    let parametro: any[] = [{
      "queryId": 96,
      "mapValue": {
        "param_nombre"      : this.filtro.nombre,
        "param_codigo"      : this.filtro.codigo,
        "param_id_ger_ben"  : this.filtro.gerencia_benef,
        "param_id_estado"   : this.filtro.estado,
       "param_id_naturaleza": this.filtro.naturaleza,
        "inicio": this.datepipe.transform(this.filtro.fechaCreaInicio,'yyyy/MM/dd'),
        "fin"   : this.datepipe.transform(this.filtro.fechaCreaFin,'yyyy/MM/dd'),
      }
    }];
   this.iniciativaService.buscarRegistro(parametro[0]).subscribe(resp => {
    this.blockUI.stop();

     this.totalFiltroEncontrado = resp.length;
    //  console.log('RESUL_BUSQ', resp, this.totalFiltroEncontrado);

      this.registros = [];
      this.registros = resp;
      this.spinner.hide();
    });
  }

  registros:any[] = [];
  cargarRegistro(){
   this.registros = [];
   this.totalRegistros = 0;
   this.blockUI.start("Cargando iniciativas...");
    let arrayParametro: any[] = [
      { queryId:92 }
    ];
    this.iniciativaService.cargarRegistro(arrayParametro[0]).subscribe((resp: any) => {
          this.blockUI.stop();
          this.registros = resp;
          this.totalRegistros = resp.length;
        })
  };

  totalfiltro = 0;
  cambiarPagina(event: number) {
    let offset = event*10;
    this.spinner.show();

    if (this.totalfiltro != this.totalIniciativa) {
      this.iniciativaService.cargarRegistro(offset.toString()).subscribe( resp => {
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
      queryId: 103,
      mapValue: {
        'param_id_iniciativa' : id ,
        // 'CONFIG_REGIS_ID'  : this.usuario.user.userId,
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

          this.cargarRegistro();

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
    this.filtro.nombre          = '',
    this.filtro.codigo          = '',
    this.filtro.estado          = '',
    this.filtro.gerencia_benef  = '',
    this.filtro.naturaleza      = '',
    this.filtro.fechaCreaInicio = '',
    this.filtro.fechaCreaFin    = ''

    this.cargarRegistro();
  }

  crearIniciativa(){
    const dialogRef = this.dialog.open(ModalCrearIniciativaComponent, {width:'1000px'});

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.cargarRegistro()
      }
    })
  }

  editarIniciativa(idIniciativa: any) {
    this.dialog
      .open(ModalActualizarIniciativaComponent, { width: '1125px', data: idIniciativa, })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.cargarRegistro();
        }
      });
  }

}


