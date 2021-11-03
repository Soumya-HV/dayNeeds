import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorListPage } from './vendor-list.page';

const routes: Routes = [
  {
    path: '',
    component: VendorListPage,
  },
  {
    path: '/:category_id',
    component: VendorListPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorListPageRoutingModule {}
