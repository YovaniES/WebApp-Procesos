import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { changeResponse } from '@models';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { newvacantRespnse, reqVacantDetail, vacantAgent, vacantRequest, vacantUpdate } from '../vacancies.model';
import { VacanciesService } from '../vacancies.service';
export interface changeResponse{
	message:string,
	status:boolean,
	previous?:string
}

@Component({
  selector: 'app-vacant-detail',
  templateUrl: './vacant-detail.component.html',
  styleUrls: ['./vacant-detail.component.scss']
})
export class VacantDetailComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  data:reqVacantDetail;
  updstatus:vacantRequest = {
    type:0,
    parentCode:'',
    name:'',
    justification:'',
    vacantId:0,
    statusId:0,
    po:'',
    flagnew:false,
    comment:'',
    businesscase:'',
    files:[]
  }
  updatedData!:vacantUpdate;
  modified=false;
  completeFlow:vacantAgent[]=[];
  constructor(
      @Inject(MAT_DIALOG_DATA) public modaldata: {vacant:reqVacantDetail},
      public dialogRef:MatDialogRef<VacantDetailComponent>,
      private snackBar: MatSnackBar,
      public serv:VacanciesService) {
        this.data =  modaldata.vacant;

   }

  ngOnInit(): void {
    this.clearUpdate();
  /*   this.completeFlow = this.serv.getVacantFlow(this.data.flagnew, this.data.type.id).map(p=>{
      return {date:null,comment:null,name:null,type:p,state:0,action:this.serv.getFlowStatus(p) }
    }); */
    this.prepareFlow();
  }

  updateStatus(idstatus:number, action:string){
    Swal.fire({
      title:"Confirmación de acción",
      input: 'textarea',
      inputAttributes:{
        maxlength: "500"
      },
      text:'Justificación de la decisión (opcional):',
      showCancelButton:true,
      cancelButtonText:"Cancelar",
      confirmButtonText: action
    }).then(resp=>{
      if (resp.isConfirmed){
        this.updstatus.vacantId = this.data.id;
        this.updstatus.statusId = idstatus;
        this.updstatus.comment = resp.value.toString() || null;
        this.blockUI.start("Cargando...");
        this.serv.updateVacantStatus$(this.updstatus).subscribe((resp:any)=>{
          this.blockUI.stop();
          this.data = resp;
          this.prepareFlow();
        })
      }
    });

  }

  updateVacant(){
    this.blockUI.start("Guardando...");
    this.serv.updateVacantData$(this.updatedData).subscribe( (resp:any)=>{
      this.blockUI.stop();
      if (resp.status){
        this.data.workstream = this.updatedData.workstream,
        this.data.command = this.updatedData.command,
        this.data.ambit = this.updatedData.ambit,
        this.data.bu = this.updatedData.bu,
        this.modified = false;
      }
    });
  }

  clearUpdate(){
    this.updatedData= {
      id:this.data.id,
      idssff:'',
      parentCode:this.data.parent.code,
      workstream:this.data.workstream,
      command:this.data.command,
      ambit:this.data.ambit,
      bu:this.data.bu,
      idRequisition:'',
    }
    this.modified = false;
  }
  downloadAllFile(id:number){
    this.blockUI.start("Comprimiendo...");
    this.serv.donwloadAllAttchedFiles(id).subscribe(resp=>{
     /*  this.blockUI.stop();
      const blob = new Blob([resp.body], { type: [resp.body.type].toString() });
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = "REQ-" +this.data.id+"-files.zip";
      a.click();
      URL.revokeObjectURL(objectUrl); */
    });
  }
  downloadFile(filename:string){
    this.serv.downloadAttachToVacant(filename).subscribe(
      resp=>
        {
          /* const blob = new Blob([resp.body], { type: [resp.body.type].toString() });
          const a = document.createElement('a')
          const objectUrl = URL.createObjectURL(blob)
          a.href = objectUrl
          a.download = filename;
          a.click();
          URL.revokeObjectURL(objectUrl); */
        }
      );
  }

  showComment(commnet:string,agent:string){
    Swal.fire({
      title: agent + " comentó:",
      text:commnet
    })
  }

  files:{id:number,name:string,status:number,realid:number}[] = []
  autoinc = 0;
  onFileChange(e:any){
    for (let i = 0; i < e.target.files.length; i++) {
      this.autoinc++;
      this.files.push({id:this.autoinc, name:e.target.files[i].name, status:0, realid:0});
      // API
      this.serv.uploadAttachToRequest(e.target.files[i], this.data.id  ).subscribe((resp:any)=>{
        const subid = this.autoinc;
        const idx = this.files.findIndex(r=>r.id == subid);
        if(resp.status){
          this.data.files.push({
            azure:this.files[idx].name,
            filename: resp.message
          });
          this.files.splice(idx,1);
        } else {
          this.snackBar.open('No se pudo cargar el archivo' + this.files[idx].name,'', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'}
          );
          this.files.splice(idx,1);
        }
      });
    }
  }

  prepareFlow(){
   this.completeFlow.forEach( e => {
    const idx = this.data.agentes.findIndex(p=>p.type == e.type);
    // VALIDAR OKS
    if ( idx != -1 ){
      e.state = 1;
      e.name = this.data.agentes[idx].name;
      e.date = this.data.agentes[idx].date;
      e.comment = this.data.agentes[idx].comment;
      e.action = this.serv.getFlowAction(e.type);
    }
   });
   // VALIDAR RECHAZOS
   const idx2 = this.data.agentes.findIndex(p => p.type == "RORG" || p.type == "RCV" || p.type == "RCOM");
   if (idx2!=-1){
     const idx3 = this.completeFlow.findIndex(x=> x.type == this.data.agentes[idx2].type.replace("R","A"));
     if (idx3!=-1){
       this.completeFlow[idx3] = this.data.agentes[idx2]
       this.completeFlow[idx3].state = 2;
       this.completeFlow[idx3].action = this.serv.getFlowAction(this.completeFlow[idx3].type);
     }
   }
  }
}
