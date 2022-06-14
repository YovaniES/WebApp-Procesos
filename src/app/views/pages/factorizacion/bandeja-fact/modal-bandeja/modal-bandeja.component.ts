import { identifierName } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Registro } from 'src/app/core/interfaces/registro.interface';
import { ModalRegistroService } from 'src/app/core/services/modalRegistro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-bandeja',
  templateUrl: './modal-bandeja.component.html',
  styleUrls: ['./modal-bandeja.component.scss'],
})
export class ModalBandejaComponent implements OnInit {
  actionBtn: string = 'Registrar';
  descTecnology: any;

  registroForm = this.fb.group({
    idIniciativa         : ['', Validators.required],
    Nombre               : ['RPA-PER-CAPL', Validators.required],
    Codigo               : ['HISPAM-2201-1', Validators.required],
    VP                   : ['', Validators.required],
    Gerencia_Solicitante : ['', Validators.required],
    PO_Proyecto          : ['', Validators.required],
    Responsable          : ['', Validators.required],
    Gerencia_Beneficiaria: ['', Validators.required],
    Planner              : ['', Validators.required],
    Controller_Ger_Ben   : ['', Validators.required],
    Controller_Aprob_BC  : ['', Validators.required],
    Tecnologia           : ['', Validators.required],
    Licencias            : ['', Validators.required],
    Naturaleza           : ['', Validators.required],
  });
  constructor(
    private modalRegistroService: ModalRegistroService,
    private dialogRef: MatDialogRef<ModalBandejaComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: Registro
  ) {}

  ngOnInit(): void {
    this.editarData();
    this.getListaTecnologia(0);
    this.getListNaturaleza(0);
    this.getListaVP(0);
    this.getListGerencia(0);
  }

  editarData() {
    if (this.editData) {
      this.actionBtn = 'Actualizar';

      this.registroForm.controls['idIniciativa'].setValue(this.editData.idIniciativa);
      this.registroForm.controls['Nombre'].setValue(this.editData.Nombre);
      this.registroForm.controls['Codigo'].setValue(this.editData.Codigo);
      this.registroForm.controls['VP'].setValue(this.editData.VP);
      this.registroForm.controls['Gerencia_Solicitante'].setValue(this.editData.Gerencia_Solicitante);
      this.registroForm.controls['PO_Proyecto'].setValue(this.editData.PO_Proyecto);
      this.registroForm.controls['Responsable'].setValue(this.editData.Responsable);
      this.registroForm.controls['Gerencia_Beneficiaria'].setValue(this.editData.Gerencia_Beneficiaria);
      this.registroForm.controls['Planner'].setValue(this.editData.Planner);
      this.registroForm.controls['Controller_Ger_Ben'].setValue(this.editData.Controller_Ger_Ben);
      this.registroForm.controls['Controller_Aprob_BC'].setValue(this.editData.Controller_Aprob_BC);
      this.registroForm.controls['Tecnologia'].setValue(this.editData.Tecnologia);
      this.registroForm.controls['Licencias'].setValue(this.editData.Licencias);
      this.registroForm.controls['Naturaleza'].setValue(this.editData.Naturaleza);
    }
  }

  // Lista de NATURALEZA
  naturaleza: Array<any> = [];
  getListNaturaleza(id: number) {
    let parametro: any[] = [
      { queryId: 90 },
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

  // OBTENCION DE LISTA TECNOLOGIA_X
  tecnologias:Array<any> = []
  getListaTecnologia(id: number){
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

  // LISTA DE VP PARA EL MODAL
  listVP: Array<any> = [];
  getListaVP(id: any) {

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

  // LISTA DE GERENCIA
  listGerencia: Array<any> = [];
  getListGerencia(id: any){
    let parametro: any[] = [
      { queryId: 95 }
    ];

    this.modalRegistroService.getListGerencia(parametro[0]).subscribe(resp => {
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
  }

  crearRegistro() {
    console.log('REGIS', this.registroForm.value);

    if (!this.editData) {
      if (this.registroForm.valid) {
        this.modalRegistroService
          .crearRegistro(this.registroForm.value)
          .subscribe({
            next: (resp) => {
              Swal.fire(
                'Registro agregado',
                'Registro creado con éxito',
                'success'
              );
              this.registroForm.reset();
              this.close(true);
            },
            error: () => {
              Swal.fire('Error!', 'Cuidado', 'warning');
            },
          });
      }
    } else {
      this.actualizarRegistro();
    }
  }

  actualizarRegistro() {
    this.modalRegistroService
      .actualizarRegistro(this.registroForm.value, this.editData.idIniciativa)
      .subscribe({
        next: (resp) => {
          Swal.fire('Actualizar registro', 'Regsitro actualizado', 'success');
          this.registroForm.reset();
          this.dialogRef.close();
        },
        error: () => {
          Swal.fire('ERROR', 'No se pudo actualizar el registro', 'warning');
        },
      });
  }

  close(exit?: boolean) {
    this.dialogRef.close(exit);
  }
}



