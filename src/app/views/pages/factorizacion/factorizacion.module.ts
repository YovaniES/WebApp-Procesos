import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactorizacionRoutingModule } from './factorizacion-routing.module';
import { BandejaFactComponent } from './bandeja-fact/bandeja-fact.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    BandejaFactComponent
  ],
  imports: [
    FactorizacionRoutingModule,
    CoreModule,
    MaterialModule
  ]
})
export class FactorizacionModule { }
