import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { CoreModule } from 'src/app/core/core.module';
import { ReporteIniciativaComponent } from '../iniciativa/registros/reporte-iniciativa/reporte-iniciativa.component';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    RouterModule.forChild([
      { path: 'iniciativa', component:ReporteIniciativaComponent},
      {
        path: 'poraprobar',
        // component:
      },
    ]),
    CoreModule,
    MaterialModule,
  ],
})
export class VacanciesModule {}
