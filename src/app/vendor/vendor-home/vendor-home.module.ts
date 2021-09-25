import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendorHomePage } from './vendor-home.page';
import { VendorHomePageRoutingModule } from './vendor-home-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    VendorHomePageRoutingModule
  ],
  declarations: [VendorHomePage]
})
export class VendorHomePageModule {}
