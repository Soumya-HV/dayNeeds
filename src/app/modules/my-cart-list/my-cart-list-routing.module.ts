import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './my-cart-list.component';

const routes: Routes = [
  {
    path: 'cart-list',
    component: CartListComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MyCartListRoutingModule { }
