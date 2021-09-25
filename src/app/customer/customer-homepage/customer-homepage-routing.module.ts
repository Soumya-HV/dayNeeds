import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerHomePage } from './customer-homepage';

const routes: Routes = [
  {
    path: '',
    component: CustomerHomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerHomePageRoutingModule {}
