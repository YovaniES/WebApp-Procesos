import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { CoreModule } from 'src/app/core/core.module';
// import { VacanciesComponent } from '../pages/vacancies/vacancies/vacancies.component';
// import { VacantDetailComponent } from '../pages/vacancies/vacant-detail/vacant-detail.component';
// import { ToaprobeComponent } from '../pages/vacancies/toaprobe/toaprobe.component';
import { NewVacancyComponent } from './new-vacancy/new-vacancy.component';
import { ToaprobeComponent } from './toaprobe/toaprobe.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { VacantDetailComponent } from './vacant-detail/vacant-detail.component';
// import { NewVacancyComponent } from '../pages/vacancies/new-vacancy/new-vacancy.component';



@NgModule({
  declarations: [
    NewVacancyComponent,
    VacanciesComponent,
    VacantDetailComponent,
    ToaprobeComponent
  ],
  exports:[
    VacanciesComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'requerimiento',
        component: NewVacancyComponent
      },
      {
        path: 'tracking',
        component:VacanciesComponent
      },
      {
        path: 'poraprobar',
        component:ToaprobeComponent
      }
    ]),
    CoreModule,
    MaterialModule
  ]
})
export class VacanciesModule { }
