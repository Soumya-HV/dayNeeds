import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { WelcomeComponent } from './components/welcome/welcome.component';



@NgModule({
  declarations: [WelcomeComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), CommonModule, FormsModule, ReactiveFormsModule],
  exports: [WelcomeComponent, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
})
export class SharedModule {}
