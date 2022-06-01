import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { exceldata, ExcelreaderService } from 'app/core/services/excelreader.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { newvacantRespnse, poPicklist, reqVacantDetail, vacantRequest } from '../vacancies.model';
import { VacanciesService } from '../vacancies.service';
// import { VacanciesService } from '../../../vacancies/vacancies.service';
import { VacantDetailComponent } from '../vacant-detail/vacant-detail.component';

export interface exceldata{
  data:any[],
  headers: string[]
}
@Component({
  selector: 'app-new-vacancy',
  templateUrl: './new-vacancy.component.html',
  styleUrls: ['./new-vacancy.component.scss']
})
export class NewVacancyComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  showing=1;

  // PARTE 1
  showdetail=false;

  searching = false;
  textsearch = "";
  searchresult:poPicklist[] = [];
  selectedPo!:poPicklist;
  @ViewChild("result") resultelement!: ElementRef;
  private unlistener!: () => void;

  request:vacantRequest={
    type:0,
    parentCode:'',
    name:'',
    justification:'',
    vacantId: 0,
    statusId: 0,
    po:'',
    flagnew:false,
    businesscase:'',
    comment:'',
    files:[]
  }

  touched = {
    type:false,
    name:false,
    justification:false
  }

  constructor(
    private renderer: Renderer2,
    // private excel:ExcelreaderService,
    private snackBar: MatSnackBar,
    private serv:VacanciesService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  showSearchResult=false;
  poWarnmessage = "";

  doSearchVacants(){
    this.poWarnmessage = "";
    if (this.textsearch.length>0){
      this.searching = true;

      const subs:Subscription = this.serv.getPosList$(this.textsearch).subscribe((resp:any) =>{
        // this.searchresult = resp.filter(r =>  r.status!=2 || this.request.flagnew );
        this.showSearchResult = true;
        this.searching = false;

        //Listener para cerra cuando se da click fuera del resultado
        if (this.showSearchResult){
          this.unlistener = this.renderer.listen('window', 'click',(e:Event)=>{
            console.log("ESCUCHANDO")
            if(this.showSearchResult && !this.resultelement.nativeElement.contains(e.target) ){
              this.searchresult=[];
              this.showSearchResult = false;
              this.unlistener();
            } else if (!this.showSearchResult){
              this.unlistener();
            }
          });
        }
        subs.unsubscribe();
      })
    }
  }

  selectResult(po:poPicklist)  {
    this.textsearch = "";
    this.showSearchResult = false;
    this.selectedPo = po;
    if (po.status == 1 && !this.request.flagnew){
      this.poWarnmessage = "Esta posición tiene un reclutamiento activo";
    }else{
      this.poWarnmessage = "";
    }
  }

  clearPickedParent(){
    this.selectedPo!;
    this.poWarnmessage="";
  }

  clearAll(){
    this.touched = {
      justification:false,
      name:false,
      type:false
    }
    this.clearPickedParent();
    this.request={
      type:0,
      parentCode:'',
      name:'',
      justification:'',
      vacantId: 0,
      statusId: 0,
      po:'',
      flagnew:false,
      businesscase:'',
      comment:'',
      files:[]
    }
    this.files = [];
  }

  register(){

    this.touched = {
      justification:true,
      name:true,
      type:true
    }

    // NORMALIZAR
    // if (this.request.name == "") this.request.name = null;
    // if (this.request.justification == "") this.request.justification = null;
    if (this.selectedPo!=null){
      if (this.request.flagnew){
        this.request.parentCode = this.selectedPo.code;
      }else{
        this.request.po = this.selectedPo.code;
      }
    }else{
      this.poWarnmessage = "Debe buscar y seleccionar una posición.";
      return;
    }

    // VALIDAR
    if (this.request.type*1 == 0) return;
    if (this.request.name == null ) return;
    if (this.request.justification == null ) return;
    if (this.poWarnmessage != "" ) return;

    // AGREGAR ADJUNTOS
    let fac = 1;

    this.request.files = this.files.map(p=>{  fac = fac*p.status;  return p.realid;});
    if (fac == 0){
      Swal.fire({
        icon:"warning",
        title:"Espere a que todos los adjuntos terminen de cargar."
      });
      return;
    }
    console.log(this.request);
    // HACER PETICIÓN
    this.blockUI.start("Registrando...");
    const subs:Subscription = this.serv.postNewVacanciRequest([this.request]).subscribe((resp:any)=>{
      if (resp.status ){
        if (resp.idVa){
          this.serv.getVacantDetail$(resp.idVa).subscribe((resp2:any) =>{
            this.blockUI.stop();
            this.dialog.open(VacantDetailComponent, {data:{vacant:resp2},panelClass:'custom-modalbox',height:"85%" } );
          });
        }else{
          this.blockUI.stop();
          Swal.fire({
            icon:"success",
            title:"Operación exitosa"
          });
        }
        this.clearAll();
      }else{
        this.blockUI.stop();
        Swal.fire({
          icon:"error",
          title:"Se produjo un error",
          text:resp.message
        });
      }
      subs.unsubscribe();
    },
    (e)=>{
      this.blockUI.stop();
      subs.unsubscribe();
      Swal.fire({
        icon:"error",
        text:"Se produjo un error inesperado"
      })
    });

  }

  // ATTACHFILES
  files:{id:number,name:string,status:number,realid:number}[] = []
  dropAttach(){

  }

  autoinc = 0;
  attachFileChange(e:any){
    for (let i = 0; i < e.target.files.length; i++) {
      this.autoinc++;
      this.files.push({id:this.autoinc, name:e.target.files[i].name, status:0, realid:0});
      this.serv.uploadAttachToVacant(e.target.files[i]).subscribe((resp:any)=>{
        const subid = this.autoinc;
        const idx = this.files.findIndex(r=>r.id == subid);
        if(resp.status){
          this.files[idx].status = 1;
          this.files[idx].realid = resp.idVa;
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


  // EXCEL READER HANDLER
  excelname="";
  exceldata:exceldata = {
    data:[],
    headers:[]
  };
  masjustification="";
  masbbcc="";
  touched2 = {
    justify:false,
    format:false,
    bc:false
  }
  @ViewChild("excelfile") excelinputfile!:ElementRef;

  onExcelChange(e:File[]){
    if (e){
      this.excelname = e[0].name;
      this.blockUI.start("Decodificando archivo...");
      // this.excel.read(e).subscribe(resp=>{
      //   this.blockUI.stop();
      //   this.exceldata = resp;
      // },
      // (error)=> this.blockUI.stop());
    }
  }

  clearexcel(){
    this.exceldata = {
      data:[],
      headers:[]
    };
    this.excelname="";
    this.excelinputfile.nativeElement.value = "";
  }

  clearForm2(){
      this.clearexcel();
      this.masjustification = "";
      this.masbbcc = "";
  }

  savebusinesscase(){
    // Validar inputs
    this.touched2 = {
      bc:true,
      format:true,
      justify:true
    }

    // Validar inputs
    if (this.masbbcc == "") return;
    if (this.masjustification == "") return;
    if (this.excelname == "") return;

    // Validar Excel
    let errormessage="";
    if (!this.exceldata.headers.includes("tipo")) errormessage = 'El campo "tipo" no está presente';
    else if (!this.exceldata.headers.includes("codigo_padre") ) errormessage = 'El campo "codigo_padre" no está presente';
    else if (!this.exceldata.headers.includes("nombre_puesto") ) errormessage = 'El campo "nombre_puesto" no está presente';
    else if (!this.exceldata.headers.includes("codigo") ) errormessage = 'El campo "codigo" no está presente';

    if (errormessage!="") {
      Swal.fire({
        icon: "error",
        title:"Formato incorrecto",
        text: errormessage
      });
      return;
    }

    // crear request
    const requestlist:vacantRequest[] = [];
    for ( let [idx,row] of this.exceldata.data.entries()){

      let idt = row['tipo']*1; //this.getTypeId(row['tipo']);
      if (!row['nombre_puesto'] || row['nombre_puesto']=="") errormessage = 'Falta "nombre_puesto" en la fila '+ (idx+1);
      else if (!row['codigo']  && !row['codigo_padre']) errormessage = 'Falta "codigo" o "codigo_padre" en la fila '+ (idx+1);
      else if ( !row['tipo'] ) errormessage = 'Falta "tipo" en la fila '+ (idx+1);
      else if (idt==0) errormessage = 'Columna "tipo" incorrecta '+ (idx+1);

      if (errormessage!="") {
        Swal.fire({
          icon: "error",
          title:"Formato incorrecto",
          text: errormessage
        });
        return;
      }

      const file:vacantRequest={
        type: idt,
        parentCode:row['codigo_padre'] || null,
        name:row['nombre_puesto'],
        justification:"BC " + this.masbbcc + ": " + this.masjustification,
        vacantId:0,
        statusId:0,
        po:row['codigo'] || null,
        flagnew:row['codigo_padre']?true:false,
        businesscase: this.masbbcc,
        comment:'',
        files:[]
      }
      requestlist.push(file);
    };

    // Hacer petición
    this.blockUI.start("Registrando...");
    const subs:Subscription = this.serv.postNewVacanciRequest(requestlist).subscribe((resp:any)=>{
      this.blockUI.stop();
      if (resp.status){
        Swal.fire({
          icon:"success",
          title:"Operación exitosa",
          text:"Puede ver la lista completa de requerimientos en el menú Seguimiento"
        });
      }else{
        Swal.fire({
          icon:"error",
          title:"Se produjo un error",
          text: resp.message
        });
      }
      subs.unsubscribe();
    },
    (e)=>{
      this.blockUI.stop();
      subs.unsubscribe();
    });
  }

  getTypeId(name:string){
    if (name == 'Externa') return 1;
    else if (name == 'INT Lid') return 2;
    else if (name == 'INT CI') return 3;
    else if (name == '') return 4;
    else return 0;
  }

}
