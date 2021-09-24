import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorSchedulePage } from './vendor-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: VendorSchedulePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorSchedulePageRoutingModule {}
