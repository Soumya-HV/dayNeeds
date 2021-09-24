import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerHomePage } from './customer-homepage';
import { CustomerHomePageRoutingModule } from './customer-homepage-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomerHomePageRoutingModule
  ],
  declarations: [CustomerHomePage]
})
export class CustomerHomePageModule {}
