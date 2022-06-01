import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { reqVacantDetail, reqVacantDTO } from '../vacancies.model';
import { VacanciesService } from '../vacancies.service';
// import { VacanciesService } from '../../../vacancies/vacancies.service';
import { VacantDetailComponent } from '../vacant-detail/vacant-detail.component';

@Component({
  selector: 'app-toaprobe',
  templateUrl: './toaprobe.component.html',
  styleUrls: ['./toaprobe.component.scss']
})
export class ToaprobeComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  loadingInbox = false;
  inbox:reqVacantDTO[]= [];

  constructor(private serv:VacanciesService, private dialog:MatDialog) { }

  ngOnInit(): void {

    this.callApiToAprobe();
  }


  callApiToAprobe(){
    this.loadingInbox = true;
    this.serv.getToAprobe$().subscribe((resp:any)=>{
      this.loadingInbox = false;
      this.inbox = resp;
    })
  }

  showDetails(id:number){
    this.blockUI.start("Preparando información...");
    this.serv.getVacantDetail$(id).subscribe( (resp:any) => {
      this.blockUI.stop();
      this.dialog.open(VacantDetailComponent, {data:{vacant:resp},panelClass:'custom-modalbox',height:"85%" } ).afterClosed()
      .subscribe((dr:reqVacantDetail)=>{
        console.log(dr);
        if (dr){
          const idx = this.inbox.findIndex(p=> p.id==id);
          this.inbox[idx] = {...this.inbox[idx], status: dr.status, workstream: dr.workstream, ambit: dr.ambit, bu: dr.bu }
        }
      });

    }) ;
  }
}

