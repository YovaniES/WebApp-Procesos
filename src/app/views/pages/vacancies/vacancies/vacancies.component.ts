import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subscription } from 'rxjs';
import { reqVacantDetail, reqVacantDTO } from '../vacancies.model';
import { VacanciesService } from '../vacancies.service';
import { VacantDetailComponent } from '../vacant-detail/vacant-detail.component';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  showingVacant!:reqVacantDetail;

  data!:reqVacantDTO[];


  datas= [
    {
      id:5,
      code: "PAS-001",
      text: "Bandeja",
      order: 3,
      icon: "format_list_numbered",
      type: "oso",
      link: "bandeja/operaciones",
      enable: true,
      module: "PAS",
      displayed: false
    }
  ]

  table_settings = {
    page:1,
    size:20,
    pages:0
  }

  loadingItem = false;
  searcher = "";
  /* FILTERS */
  bu="ALL";
  command="ALL";
  vacType="1,2,3,4";
  textvacType = "Todos";
  workstream='ALL';
  ambit="ALL";
  vacStatus=0;

  constructor(private serv:VacanciesService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.callItemApi();
  }

  doPageChange(i:number){
    this.table_settings.page = this.table_settings.page + i;
    this.callItemApi();
  }



  callItemApi(reset:boolean=false){
    if (reset){
      this.table_settings.page= 1;
    }
    this.loadingItem = true;
    const subs:Subscription = this.serv.getAllRequests$(
        this.table_settings.page - 1,
        this.table_settings.size,
        this.searcher,
        this.vacStatus,
        this.command,
        this.workstream,
        this.bu,
        this.vacType,
        this.ambit,
        new Date("07/01/2018"),
        new Date("01/12/2031")
        )
        .subscribe((r:any)=>{
          this.data = r.content;
          this.table_settings.pages = Math.ceil(r.total/r.size);
      this.loadingItem = false;
      subs.unsubscribe();
    });
  }

  showDetails(id:number){
    this.blockUI.start("Preparando información...");
    this.serv.getVacantDetail$(id).subscribe( (resp:any) => {
      this.blockUI.stop();
      this.dialog.open(VacantDetailComponent, {data:{vacant:resp},panelClass:'custom-modalbox',height:"85%" } ).afterClosed()
      .subscribe((dr:reqVacantDetail)=>{

        if (dr){
          const idx = this.data.findIndex(p=> p.id==id);
          this.data[idx] = {...this.data[idx],
              status: dr.status,
              workstream: dr.workstream,
              ambit: dr.ambit,
              bu: dr.bu }
              console.log(this.data[idx])
        }
      });

    }) ;
  }


  showTypepl = false;

  idtypes:number[] = [1,2,3,4];
  type = {
    mixta:{
      id: 4,
      value:true
    },
    intlid:{
      id: 2,
      value:true
    },
    intci: {
      id: 3,
      value:true
    },
    ext: {
      id: 1,
      value:true
    }
  }


  showPicklistType(){
    this.showTypepl = true;
  }
  applyfiltertype(){
    let newarray:number[] = [];
    if (this.type.mixta.value) newarray.push(this.type.mixta.id);
    if (this.type.intlid.value) newarray.push(this.type.intlid.id);
    if (this.type.intci.value) newarray.push(this.type.intci.id);
    if (this.type.ext.value) newarray.push(this.type.ext.id);
    this.idtypes = newarray;
    this.showTypepl = false;

    let text = "";
    for (const i of this.idtypes) {
      text = "," + i.toString() + text;
    }
    this.vacType = text;
    this.textvacType = this.idtypes.length==4?'Todos': this.idtypes.length + ' seleccionados';
    this.callItemApi();
  }

  cancelfiltertype(){
    this.showTypepl = false;
    this.type.mixta.value = this.idtypes.includes(this.type.mixta.id);
    this.type.intlid.value = this.idtypes.includes(this.type.intlid.id);
    this.type.intci.value = this.idtypes.includes(this.type.intci.id);
    this.type.ext.value = this.idtypes.includes(this.type.ext.id);
    this.showTypepl = false;
  }
}
