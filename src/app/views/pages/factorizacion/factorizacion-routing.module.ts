import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandejaFactComponent } from './bandeja-fact/bandeja-fact.component';

const routes: Routes = [
  {
    path:'operaciones', component:BandejaFactComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorizacionRoutingModule { }
