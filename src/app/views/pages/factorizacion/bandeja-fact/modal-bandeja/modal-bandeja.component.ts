import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { reqVacantDTO, vacantRequest } from '../bandeja-fact.component';

@Component({
  selector: 'app-modal-bandeja',
  templateUrl: './modal-bandeja.component.html',
  styleUrls: ['./modal-bandeja.component.scss']
})
export class ModalBandejaComponent implements OnInit {
  showing=1;

  // registroForm!:FormGroup;

  constructor(
    private dialogRef:MatDialogRef<ModalBandejaComponent>,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData:{

    }
  ){}

  touched = {
    type:false,
    name:false,
    justification:false
  }
  request:vacantRequest={
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
    files: []
  }


  registroForm = this.fb.group({
    nombre:['', Validators.required],
    edad:['']
  })

  ngOnInit(): void {

  }

  close(exit?:boolean){
    this.dialogRef.close(exit)
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

  clearPickedParent(){
  }
}
