import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registros/registro.component';
import { ModalRegistroComponent } from './registros/modal-registro-actualizar/modal-registro.component';

const routes: Routes = [
  {
    path:'iniciativa', component:RegistroComponent,
  },
  {
    path: 'editar', component: ModalRegistroComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorizacionRoutingModule { }
