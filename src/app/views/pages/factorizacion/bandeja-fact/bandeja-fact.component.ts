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
}
