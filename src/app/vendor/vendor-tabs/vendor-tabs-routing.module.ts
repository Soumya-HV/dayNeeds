import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorTabs } from './vendor-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: VendorTabs,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../vendor-home/vendor-home.module').then(m => m.VendorHomePageModule)
      },
      {
        path: 'product-list',
        loadChildren: () => import('../product-list/product-list.module').then(m => m.ProductListPageModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('../vendor-schedule/vendor-schedule.module').then(m => m.VendorSchedulePageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../vendor-orders/vendor-orders.module').then(m => m.VendorOrdersPageModule)
      },
      {
        path: '',
        redirectTo: '/vendor/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/vendor/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
