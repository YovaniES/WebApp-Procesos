import { NgModule } from '@angular/core';

import { FactorizacionRoutingModule } from './iniciativa-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ModalBandejaComponent } from './registros/modal-bandeja/modal-bandeja.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalRegistroComponent } from './registros/modal-registro-actualizar/modal-registro.component';
import { RegistroComponent } from './registros/bandeja-fact.component';

@NgModule({
  declarations: [
    RegistroComponent,
    ModalBandejaComponent,
    ModalRegistroComponent,
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
export class IniciativaModule { }
