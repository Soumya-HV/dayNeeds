import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { VendorSchedulePage } from './vendor-schedule.page';
import { VendorSchedulePageRoutingModule } from './vendor-schedule-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: VendorSchedulePage }]),
    VendorSchedulePageRoutingModule,
  ],
  declarations: [VendorSchedulePage]
})
export class VendorSchedulePageModule {}
