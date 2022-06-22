import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandejaFactComponent } from './bandeja-fact/bandeja-fact.component';
import { BuscarBandejaComponent } from './bandeja-fact/buscar-bandeja/buscar-bandeja.component';
import { ModalRegistroComponent } from './bandeja-fact/modal-registro-actualizar/modal-registro.component';

const routes: Routes = [
  {
    path:'iniciativa', component:BandejaFactComponent,
  },
  {
    path: 'buscar', component: BuscarBandejaComponent
  },
  {
    path: 'editar', component: ModalRegistroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorizacionRoutingModule { }
