import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendorListPage } from './vendor-list.page';
import { VendorListPageRoutingModule } from './vendor-list-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    VendorListPageRoutingModule
  ],
  declarations: [VendorListPage]
})
export class VendorListPageModule {}
