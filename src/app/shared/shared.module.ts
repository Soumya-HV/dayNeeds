import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicRatingComponentModule } from 'ionic-rating-component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { OTPComponent } from './components/otp/otp.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { AddressComponent } from './components/address/address.component';
import { UserTypeSelectionComponent } from './components/user-type-selection/user-type-selection.component';
// import { GeoLocationComponent } from '../modules/geo-location/geo-location.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ManageAddressComponent } from './components/manage-address/manage-address.component';
import { VendorPaymentComponent } from './components/vendor-payment/vendor-payment.component';
import { AddSubUserComponent } from './components/add-sub-user/add-sub-user.component';
import { SelectCategory } from './components/select-categories/select-categories.component';
import { VendorShopdetailsComponent } from './components/vendor-shopdetails/vendor-shopdetails.component';
import { VendorProductComponent } from './components/vendor-product/vendor-product.component';
import { VendorDabbastoryComponent } from './components/vendor-dabbastory/vendor-dabbastory.component'
import { VendorAddOfferComponent } from './components/vendor-add-offer/vendor-add-offer.component';
import { UnitSelectComponent } from './components/unit-select/unit-select.component';
import { SelectApartmentComponent } from './components/select-apartment/select-apartment.component';
import { VendorEditProductComponent } from './components/vendor-edit-product/vendor-edit-product.component';
import { AgmCoreModule } from '@agm/core';
import { GeoLocationComponent } from '../modules/geo-location/geo-location.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { CustomizeOrderCartComponent } from './components/customize-order-cart/customize-order-cart.component';
import { SelectBlockComponent } from './components/select-block/select-block.component';
import { SelectFloorComponent } from './components/select-floor/select-floor.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    LoginComponent,
    OTPComponent, 
    UserTypeSelectionComponent,
    RewardsComponent,
    AddressComponent,
    NotificationComponent, 
    ManageAddressComponent,
    VendorPaymentComponent,
    AddSubUserComponent,
    VendorShopdetailsComponent,
    VendorProductComponent,
    VendorDabbastoryComponent,
    VendorAddOfferComponent,
    SelectApartmentComponent,
    UnitSelectComponent,
    VendorEditProductComponent,
    SelectCategory,
    GeoLocationComponent,
    PlaceOrderComponent, CustomizeOrderCartComponent, SelectBlockComponent, SelectFloorComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    IonicRatingComponentModule, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHzvusQWw8cplAWj39XLMlbxDAwm56OVI', 
      libraries: ['places']
    })],
  exports: [
    WelcomeComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicRatingComponentModule,
    HttpClientModule,
    LoginComponent,
    OTPComponent,
    VendorEditProductComponent,
    UnitSelectComponent,
    UserTypeSelectionComponent,
    SelectApartmentComponent,
    RewardsComponent,
    AddressComponent,
    NotificationComponent,
    ManageAddressComponent,
    VendorAddOfferComponent,
    VendorPaymentComponent,
    VendorShopdetailsComponent,
    VendorDabbastoryComponent,
    AddSubUserComponent,
    VendorProductComponent,
    SelectCategory,GeoLocationComponent, SelectFloorComponent,PlaceOrderComponent, CustomizeOrderCartComponent, SelectBlockComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
})
export class SharedModule {}
