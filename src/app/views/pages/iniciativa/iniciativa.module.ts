import { NgModule } from '@angular/core';

import { FactorizacionRoutingModule } from './iniciativa-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RegistroComponent } from './registros/registro.component';
// import { ReporteIniciativaComponent } from './registros/reporte-iniciativa/reporte-iniciativa.component';
import { ModalCrearRegistroComponent } from './registros/modal-crear-registro/modal-crear-registro.component';
import { ModalActualizarRegistroComponent } from './registros/modal-registro-actualizar/modal-actualizar-registro.component';
import { ReporteIniciativaComponent } from './registros/reporte-iniciativa/reporte-iniciativa.component';

@NgModule({
  declarations: [
    RegistroComponent,
    ModalActualizarRegistroComponent,
    ReporteIniciativaComponent,
    ModalCrearRegistroComponent,
  ],
  exports:[
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
