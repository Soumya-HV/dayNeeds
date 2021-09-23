import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { OTPComponent } from './components/otp/otp.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { AddressComponent } from './components/address/address.component';
import { UserTypeSelectionComponent } from './components/user-type-selection/user-type-selection.component';
import { CartListComponent } from '../modules/my-cart-list/my-cart-list.component';
import { GeoLocationComponent } from '../modules/geo-location/geo-location.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NotificationComponent } from './components/notification/notification.component';
import { ManageAddressComponent } from './components/manage-address/manage-address.component';
import { VendorPaymentComponent } from './components/vendor-payment/vendor-payment.component';
import { AddSubUserComponent } from './components/add-sub-user/add-sub-user.component';


@NgModule({
  declarations: [WelcomeComponent,LoginComponent,OTPComponent, UserTypeSelectionComponent, CartListComponent, GeoLocationComponent, RewardsComponent, AddressComponent, NotificationComponent, ManageAddressComponent, VendorPaymentComponent, AddSubUserComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [WelcomeComponent, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule,LoginComponent,OTPComponent, UserTypeSelectionComponent, CartListComponent, GeoLocationComponent, RewardsComponent, AddressComponent, NotificationComponent, ManageAddressComponent, VendorPaymentComponent, AddSubUserComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SmsRetriever,Geolocation],
})
export class SharedModule {}
