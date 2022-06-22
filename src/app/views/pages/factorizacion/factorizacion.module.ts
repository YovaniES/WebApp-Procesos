import { NgModule } from '@angular/core';

import { FactorizacionRoutingModule } from './factorizacion-routing.module';
import { BandejaFactComponent } from './bandeja-fact/bandeja-fact.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ModalBandejaComponent } from './bandeja-fact/modal-bandeja/modal-bandeja.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BuscarBandejaComponent } from './bandeja-fact/buscar-bandeja/buscar-bandeja.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalRegistroComponent } from './bandeja-fact/modal-registro-actualizar/modal-registro.component';

@NgModule({
  declarations: [
    BandejaFactComponent,
    ModalBandejaComponent,
    ModalRegistroComponent,
    BuscarBandejaComponent
  ],
  exports:[
    ModalBandejaComponent,
    ModalRegistroComponent
  ],
  imports: [
    FactorizacionRoutingModule,
    CoreModule,
    MaterialModule,
    NgxPaginationModule,
    NgxSpinnerModule,

  ],
  providers: [DatePipe],

})
export class FactorizacionModule { }
