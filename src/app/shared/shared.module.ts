import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { OTPComponent } from './components/otp/otp.component';
import { UserTypeSelectionComponent } from './components/user-type-selection/user-type-selection.component';
import { CartListComponent } from '../modules/my-cart-list/my-cart-list.component';
import { GeoLocationComponent } from '../modules/geo-location/geo-location.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@NgModule({
  declarations: [WelcomeComponent,AuthenticateComponent,OTPComponent, UserTypeSelectionComponent, CartListComponent, GeoLocationComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [WelcomeComponent, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule,AuthenticateComponent,OTPComponent, UserTypeSelectionComponent, CartListComponent, GeoLocationComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SmsRetriever,Geolocation],
})
export class SharedModule {}
