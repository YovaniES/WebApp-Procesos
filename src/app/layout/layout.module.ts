import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { BaseComponent } from './base/base.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    AsideComponent,
    BaseComponent
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    AsideComponent,
    BaseComponent,
  ],

  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
