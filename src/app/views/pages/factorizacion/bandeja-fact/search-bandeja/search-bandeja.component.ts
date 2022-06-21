import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Registro } from 'src/app/core/interfaces/registro.interface';
import { ModalRegistroService } from 'src/app/core/services/modalRegistro.service';

@Component({
  selector: 'app-search-bandeja',
  templateUrl: './search-bandeja.component.html',
  styleUrls: ['./search-bandeja.component.scss'],
})
export class SearchBandejaComponent implements OnInit {
  loadingItem = false;
  registros: Registro[] = [];

  searcher = '';
  regStatus = 0;
  showTypepl = false;

  table_settings = {
    page: 1,
    size: 5,
    pages: 0,
  };
  constructor(private modalRegistroService: ModalRegistroService) {}

  ngOnInit(): void { }

/*   callItemApi(reset: boolean = false) {
    if (reset) {
      this.table_settings.page = 1;
    }
    this.loadingItem = true;
    const subs: Subscription = this.modalRegistroService
      .getAllRequest(
        this.table_settings.page - 1,
        this.table_settings.size,
        this.searcher,
        this.regStatus
      )
      .subscribe((resp: any) => {
        this.registros = resp.content;
        this.table_settings.pages = Math.ceil(resp.total/resp.size);
        this.loadingItem = false;
        // subs:unsubscribe();
      });
  } */


  showPicklistType() {
    this.showTypepl = true;
  }

  idtypes: number[] = [1, 2, 3, 4];

  type = {
    mixta: { id: 4, value: true },
    intlid: { id: 2, value: true },
    intci: { id: 3, value: true },
    ext: { id: 1, value: true },
  };

  vacStatus = 0;
  vacType = '1,2,3,4';
  textvacType = 'Todos';

  applyfiltertype() {
    let newarray: number[] = [];
    if (this.type.mixta.value) newarray.push(this.type.mixta.id);
    if (this.type.intlid.value) newarray.push(this.type.intlid.id);
    if (this.type.intci.value) newarray.push(this.type.intci.id);
    if (this.type.ext.value) newarray.push(this.type.ext.id);
    this.idtypes = newarray;
    this.showTypepl = false;

    let text = '';
    for (const i of this.idtypes) {
      text = ',' + i.toString() + text;
    }
    this.vacType = text;
    this.textvacType =
      this.idtypes.length == 4
        ? 'Todos'
        : this.idtypes.length + ' seleccionados';
  }

  cancelfiltertype() {
    this.showTypepl = false;
    this.type.mixta.value = this.idtypes.includes(this.type.mixta.id);
    this.type.intlid.value = this.idtypes.includes(this.type.intlid.id);
    this.type.intci.value = this.idtypes.includes(this.type.intci.id);
    this.type.ext.value = this.idtypes.includes(this.type.ext.id);
    this.showTypepl = false;
  }
}
