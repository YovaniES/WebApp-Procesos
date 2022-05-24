import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './layout/base/base.component';

const routes: Routes = [
  { path: 'login',
    loadChildren: () => import('./views/auth/auth.module').then((m) => m.AuthModule),
  },
  { path:'**',
    loadChildren: () => import('./views/errors/errors.module').then((m) => m.ErrorsModule),
  },
  /* {
    path:'',component:BaseComponent,
    loadChildren:() => import('./views/pages/')
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}

