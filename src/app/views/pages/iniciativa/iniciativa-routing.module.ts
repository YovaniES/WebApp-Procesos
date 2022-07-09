import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registros/registro.component';
import { ReporteIniciativaComponent } from './registros/reporte-iniciativa/reporte-iniciativa.component';

const routes: Routes = [
  {path: '', children: [
    { path: 'registros', component:RegistroComponent, },
    { path: 'reporte', component: ReporteIniciativaComponent },
    { path: '**', redirectTo: 'registros'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorizacionRoutingModule { }
