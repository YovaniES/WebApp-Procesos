import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { CoreModule } from '../core/core.module';
import { UserSectionComponent } from './header/user-section/user-section.component';
import { AsideComponent } from './aside/aside.component';
import { BaseComponent } from './base/base.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AsideComponent,
    FooterComponent,
    UserSectionComponent,
    BaseComponent,
  ],
  exports:[
    HeaderComponent,
    AsideComponent,
    FooterComponent,
    UserSectionComponent,
    BaseComponent
  ],

  imports: [
    MaterialModule,
    CoreModule
  ]
})
export class LayoutModule { }
