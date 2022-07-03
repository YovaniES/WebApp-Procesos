import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registros/registro.component';
import { BuscarRegistrosComponent } from './registros/buscar-registros/buscar-registros.component';

const routes: Routes = [
  {
    path:'iniciativa', component:RegistroComponent,
  },
  {
    path: 'editar', component: BuscarRegistrosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorizacionRoutingModule { }
