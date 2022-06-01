import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { VacanciesService } from 'src/app/core/services/vacancies.service';
import { HomeComponent } from '../../home/home.component';
export interface vacantRequest {
  name: string;
  type: number;
  justification: string;
  parentCode: string;
  po: string;
  vacantId: number;
  statusId: number;
  flagnew: boolean;
  comment: string;
  businesscase: string;
  files: number[];
}

export interface reqVacantDTO {
  id: number;
  // parent: vacantParent;
  // titular: vacantTitular;
  position: string;
  level: number;
  command: string;
  ambit: string;
  bu: string;
  workstream: string;
  // status: vacantStatus;
  // type: vacantType;
  flagnew: boolean;
  informer: string;
  createdat: Date;
  filteraprob: string;
}

@Component({
  selector: 'app-bandeja-fact',
  templateUrl: './bandeja-fact.component.html',
  styleUrls: ['./bandeja-fact.component.scss'],
})
export class BandejaFactComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
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

  constructor(
    private vacanciesService:VacanciesService,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {}

  clearPickedParent() {
    // this.selectedPo = null;
    // this.poWarnmessage="";
  }

  clearAll() {}

  register() {}

  showDetails(id: number) {
    this.blockUI.start('Preparando información...');
    this.vacanciesService.getVacantDetail$(id).subscribe((resp: any) => {
      this.blockUI.stop();
      this.dialog
        .open(HomeComponent, {
          data: { vacant: resp },
          panelClass: 'custom-modalbox',
          height: '85%',
        })
        .afterClosed()
        .subscribe((dr: any) => {
          console.log(dr);
          if (dr) {
            const idx = this.inbox.findIndex((p) => p.id == id);
            this.inbox[idx] = {
              ...this.inbox[idx],
              // status: dr.status,
              workstream: dr.workstream,
              ambit: dr.ambit,
              bu: dr.bu,
            };
          }
        });
    });
  }

  callItemApi(reset:boolean=false){ }

  searcher = "";
  showTypepl = false;
  showPicklistType(){
    this.showTypepl = true;
  }

  idtypes:number[] = [1,2,3,4];

  type = {
    mixta:{id: 4, value:true
    },
    intlid:{id: 2, value:true
    },
    intci: {id: 3, value:true
    },
    ext: {id: 1, value:true
    }
  }


  vacStatus=0;
  vacType="1,2,3,4";
  textvacType = "Todos";
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
