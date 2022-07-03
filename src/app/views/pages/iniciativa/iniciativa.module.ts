import { NgModule } from '@angular/core';

import { FactorizacionRoutingModule } from './iniciativa-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ModalBandejaComponent } from './registros/modal-bandeja/modal-bandeja.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RegistroComponent } from './registros/registro.component';
import { BuscarRegistrosComponent } from './registros/buscar-registros/buscar-registros.component';
import { ModalCrearRegistroComponent } from './registros/modal-crear-registro/modal-crear-registro.component';
import { ModalActualizarRegistroComponent } from './registros/modal-registro-actualizar/modal-actualizar-registro.component';

@NgModule({
  declarations: [
    RegistroComponent,
    ModalBandejaComponent,
    ModalActualizarRegistroComponent,
    BuscarRegistrosComponent,
    ModalCrearRegistroComponent,
  ],
  exports:[
    ModalBandejaComponent,
    ModalActualizarRegistroComponent,
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
