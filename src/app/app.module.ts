import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoDynamicModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { PoStepperModule } from '@po-ui/ng-components';
import { PoListViewModule } from '@po-ui/ng-components';
import { PoContainerModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    PoDynamicModule,
    PoButtonModule,
    HttpClientModule,
    PoStepperModule,
    PoListViewModule,
    PoContainerModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
