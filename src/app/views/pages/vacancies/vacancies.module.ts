import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
  ],
  exports:[
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'tracking',
      },
      {
        path: 'poraprobar',
        // component:ToaprobeComponent
      }
    ]),
    CoreModule,
    MaterialModule
  ]
})
export class VacanciesModule { }
