import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerMyOrderComponent } from './customer-myorder.component';
import { CustomerMyOrderComponentRoutingModule } from './customer-myorder-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomerMyOrderComponentRoutingModule
  ],
  declarations: [CustomerMyOrderComponent]
})
export class CustomerMyOrderModule {}
