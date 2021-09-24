import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyCartPage } from './mycart.page';
import { MyCartPageRoutingModule } from './mycart-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MyCartPage }]),
    MyCartPageRoutingModule,
  ],
  declarations: [MyCartPage]
})
export class MyCartPageModule {}
