import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMyOrderComponent } from './customer-myorder.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerMyOrderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerMyOrderComponentRoutingModule {}
