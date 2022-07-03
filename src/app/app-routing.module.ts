import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './layout/base/base.component';

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
        path:'dashboard',
        loadChildren: () => import('./views/pages/vacancies/vacancies.module').then((m)=>m.VacanciesModule),
      },
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


