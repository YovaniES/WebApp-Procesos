import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bandeja',
  templateUrl: './search-bandeja.component.html',
  styleUrls: ['./search-bandeja.component.scss']
})
export class SearchBandejaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
