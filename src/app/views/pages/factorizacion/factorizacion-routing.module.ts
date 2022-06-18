import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandejaFactComponent } from './bandeja-fact/bandeja-fact.component';
import { BuscarBandejaComponent } from './bandeja-fact/buscar-bandeja/buscar-bandeja.component';

const routes: Routes = [
  {
    path:'operaciones', component:BandejaFactComponent,
  },
  {
    path: 'buscar', component: BuscarBandejaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorizacionRoutingModule { }
