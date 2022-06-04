import { NgModule } from '@angular/core';

import { FactorizacionRoutingModule } from './factorizacion-routing.module';
import { BandejaFactComponent } from './bandeja-fact/bandeja-fact.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ModalBandejaComponent } from './bandeja-fact/modal-bandeja/modal-bandeja.component';
import { SearchBandejaComponent } from './bandeja-fact/search-bandeja/search-bandeja.component';


@NgModule({
  declarations: [
    BandejaFactComponent,
    ModalBandejaComponent,
    SearchBandejaComponent
  ],
  exports:[
    ModalBandejaComponent,
    SearchBandejaComponent
  ],
  imports: [
    FactorizacionRoutingModule,
    CoreModule,
    MaterialModule,

  ],
  // entryComponents:[ModalBandejaComponent]
})
export class FactorizacionModule { }
