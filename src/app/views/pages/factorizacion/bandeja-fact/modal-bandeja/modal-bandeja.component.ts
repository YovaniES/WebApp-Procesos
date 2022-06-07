import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Registro } from 'src/app/core/interfaces/registro.interface';
import { ModalRegistroService } from 'src/app/core/services/modalRegistro.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-modal-bandeja',
  templateUrl: './modal-bandeja.component.html',
  styleUrls: ['./modal-bandeja.component.scss'],
})
export class ModalBandejaComponent implements OnInit {
  showing = 1;
  actionBtn:string = 'Registrar';

  registroForm = this.fb.group({
    nombre:         ['RPA-PER-CAPL', Validators.required],
    codigo:         ['HISPAM-2201-1', Validators.required],
    vp:             ['', Validators.required],
    gerenc_sol:     ['', Validators.required],
    po:             ['', Validators.required],
    responsable:    ['', Validators.required],
    gerenc_ben:     ['', Validators.required],
    planner:        ['', Validators.required],
    control_gerenc: ['', Validators.required],
    control_aprob:  ['', Validators.required],
    tecnologia:     ['', Validators.required],
    licencias:      ['', Validators.required],
    naturaleza:     ['', Validators.required],
  });
  constructor(
    private modalRegistroService: ModalRegistroService,
    private dialogRef: MatDialogRef<ModalBandejaComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: Registro
  ) {}

  /*   touched = {
    type: false,
    name: false,
    justification: false,
    po:false
  };
  request: vacantRequest = {
    type: 0,
    parentCode: '',
    name: '',
    justification: '',
    po: '',
    vacantId: 0,
    statusId: 0,
    flagnew: false,
    comment: '',
    businesscase: '',
    files: [],
  }; */
  ngOnInit(): void {
    this.editarData();
  }

  editarData(){
    if (this.editData) {
      this.actionBtn = 'Actualizar';

      this.registroForm.controls['nombre'].setValue(this.editData.nombre);
      this.registroForm.controls['codigo'].setValue(this.editData.codigo);
      this.registroForm.controls['vp'].setValue(this.editData.vp);
      this.registroForm.controls['gerenc_sol'].setValue(this.editData.gerenc_sol);
      this.registroForm.controls['po'].setValue(this.editData.po);
      this.registroForm.controls['responsable'].setValue(this.editData.responsable);
      this.registroForm.controls['gerenc_ben'].setValue(this.editData.gerenc_ben);
      this.registroForm.controls['planner'].setValue(this.editData.planner);
      this.registroForm.controls['control_gerenc'].setValue(this.editData.control_gerenc);
      this.registroForm.controls['control_aprob'].setValue(this.editData.control_aprob);
      this.registroForm.controls['tecnologia'].setValue(this.editData.tecnologia);
      this.registroForm.controls['licencias'].setValue(this.editData.licencias);
      this.registroForm.controls['naturaleza'].setValue(this.editData.naturaleza);
    }
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
    this.modalRegistroService.actualizarRegistro(this.registroForm.value, this.editData.id)
          .subscribe({
            next: (resp)=>{
              Swal.fire(
                'Actualizar registro',
                'Regsitro actualizado',
                'success'
              );
              this.registroForm.reset();
              this.dialogRef.close();
            }, error: ()=> {
              Swal.fire(
                'ERROR',
                'No se pudo actualizar el registro',
                'warning'
              )
            }
          })
  }


  close(exit?: boolean) {
    this.dialogRef.close(exit);
  }

  /*   @BlockUI() blockUI!: NgBlockUI;
  showing=1;
  loadingInbox = false;
  inbox: reqVacantDTO[] = [];

  request: vacantRequest = {
    type: 0,
    parentCode: '',
    name: '',
    justification: '',
    vacantId: 0,
    statusId: 0,
    po: '',
    flagnew: false,
    businesscase: '',
    comment: '',
    files: [],
  };

  touched = {
    type: false,
    name: false,
    justification: false,
  };

  constructor() { }

  ngOnInit(): void {
  }


  clearAll() {}

  register() {} */

  clearPickedParent() {}
}
