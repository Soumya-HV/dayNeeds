import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTabsPage } from './customer-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerTabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../customer-homepage/customer-homepage.module').then(m => m.CustomerHomePageModule)
      },
      {
        path: 'vendor-list',
        loadChildren: () => import('../vendor-list/vendor-list.module').then(m => m.VendorListPageModule)
      },
      {
        path: 'mycart',
        loadChildren: () => import('../mycart/mycart.module').then(m => m.MyCartPageModule)
      },
      {
        path: 'myorder',
        loadChildren: () => import('../customer-myorder/customer-myorder.module').then(m => m.CustomerMyOrderModule)
      },
      {
        path: '',
        redirectTo: '/customer/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/customer/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CustomerTabsPageRoutingModule {}
