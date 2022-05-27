import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './layout/base/base.component';

const routes: Routes = [
  { path: 'login',
    loadChildren: () => import('./views/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path:'',component:BaseComponent,
    children:[
      { path:'home',
        loadChildren: () => import ('./views/pages/home/home.module').then((m) => m.HomeModule)
      },
      {
        path:'bandeja',
        loadChildren: () => import ('./views/pages/factorizacion/factorizacion.module').then((m)=>m.FactorizacionModule)
      },
      { path:'', redirectTo:'login', pathMatch:'full'}
    ]
  },

   { path:'**',
    loadChildren: () => import('./views/errors/errors.module').then((m) => m.ErrorsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}

