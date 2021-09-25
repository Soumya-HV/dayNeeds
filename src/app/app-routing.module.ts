import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { OTPComponent } from './shared/components/otp/otp.component';
import { UserTypeSelectionComponent } from './shared/components/user-type-selection/user-type-selection.component';
import { VendorPaymentComponent } from './shared/components/vendor-payment/vendor-payment.component';
import { AddSubUserComponent } from './shared/components/add-sub-user/add-sub-user.component';
import { AuthGuard } from './core/services/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'otp',
    component: OTPComponent
  },
  {
    path: 'usertype-select',
    component: UserTypeSelectionComponent
  },
  {
    path: 'vendor/payment',
    component:VendorPaymentComponent
  },
  {
    path: 'vendor/addUser',
    component:AddSubUserComponent
  },
  {
    path: 'vendor/shopDetails',
    component:AddSubUserComponent
  },
  {
    path: 'customer',
    loadChildren: () => import('../app/customer/customer-tabs/customer-tabs.module').then(m => m.CustomerTabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendor',
    loadChildren: () => import('../app/vendor/vendor-tabs/vendor-tabs.module').then(m => m.VendorTabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('../app/modules/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/geo-location/geo-location.module').then(m => m.GeoLocationModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
