import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendorOrdersPage } from './vendor-orders.page';
import { VendorOrdersPageRoutingModule } from './vendor-orders-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: VendorOrdersPage }]),
    VendorOrdersPageRoutingModule,
  ],
  declarations: [VendorOrdersPage]
})
export class VendorOrdersPageModule {}
