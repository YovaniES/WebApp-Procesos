import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Registro } from 'src/app/core/interfaces/registro.interface';
import { ModalRegistroService } from 'src/app/core/services/modalRegistro.service';
import Swal from 'sweetalert2';
import { ModalBandejaComponent } from './modal-bandeja/modal-bandeja.component';

@Component({
  selector: 'app-bandeja-fact',
  templateUrl: './bandeja-fact.component.html',
  styleUrls: ['./bandeja-fact.component.scss'],
})
export class BandejaFactComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  totalRegistros: number = 0;
  loadingItem: boolean = false;
  loadingInbox = false;

  cargando: boolean = true;
  registros: Registro[] = [];
  data: any[] = [];

  table_settings = {
    page: 1,
    size: 5,
    pages: 0,
  };

  constructor(
    private modalRegistroService: ModalRegistroService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarRegistro();
    console.log('DATA_REG', this.cargarRegistro);
  }

  cargarRegistro() {
    this.cargando = true;
    this.modalRegistroService.cargarRegistro().subscribe((resp) => {
      this.registros = resp;
      this.totalRegistros = resp.length;
    });
  }

  borrarRegistro(regist: Registro) {
    Swal.fire({
      title: '¿Borrar registro?',
      text: `¿Estas seguro que deseas eliminar a ${regist.nombre} del registro?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((resp) => {
      if (resp.value) {
        this.modalRegistroService
          .eliminarRegistro(regist.id)
          .subscribe((resp1) => {
            this.cargarRegistro();

            Swal.fire({
              title: 'Registro eliminado',
              text: 'El registro fue eliminado con éxito',
              icon: 'success',
            });
          });
      }
    });
  }

  crearRegistro() {
    const dialogRef = this.dialog.open(ModalBandejaComponent, {
      width: '1125px',
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.cargarRegistro();
      }
    });
  }

  editarRegistro(registro: Registro) {
    this.dialog
      .open(ModalBandejaComponent, { width: '1125px', data: registro })
      .afterClosed()
      .subscribe((resp1) => {
        if (resp1 == 'update') {
          this.cargarRegistro();
        }
      });
  }

  doPageChange(i: number) {
    this.table_settings.page = this.table_settings.page + i;
    this.callItemApi();
  }

  callItemApi() {}
}
