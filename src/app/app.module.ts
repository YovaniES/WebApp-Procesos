import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './views/auth/auth.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ErrorsModule } from './views/errors/errors.module';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // AuthModule,
    LayoutModule,
    ErrorsModule,

    CoreModule,MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
