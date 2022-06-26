import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './layout/base/base.component';
import { ModalBandejaComponent } from './views/pages/iniciativa/registros/modal-bandeja/modal-bandeja.component';
import { ModalRegistroComponent } from './views/pages/iniciativa/registros/modal-registro-actualizar/modal-registro.component';

const routes: Routes = [
  { path: 'login',
    loadChildren: () => import('./views/auth/auth.module').then((m) => m.AuthModule),
  },
  { path:'error',
  loadChildren: () => import('./views/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path:'',component:BaseComponent,
    children:[
      { path:'home',
        loadChildren: () => import ('./views/pages/home/home.module').then((m) => m.HomeModule)
      },
      {
        path:'registro',
        loadChildren: () => import ('./views/pages/iniciativa/iniciativa.module').then((m)=>m.IniciativaModule)
      },
      { path:'', redirectTo:'home', pathMatch:'full'},
      {
        path:'vacantes',
        loadChildren: () => import('./views/pages/vacancies/vacancies.module').then((m)=>m.VacanciesModule),
      },

      {path: 'actualizar/:id', component: ModalRegistroComponent},
      // {path: 'actualizar/:idIniciativa', component: ModalBandejaComponent},S

      {
        path:'**', redirectTo:'/error/404'
      }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}


