import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { OTPComponent } from './shared/components/otp/otp.component';
import { Tab1Page } from './tab1/tab1.page';
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
    path: 'tab',
    loadChildren: () => import('../app/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('../app/modules/register/register.module').then(m => m.RegisterModule)
  },
  // {
    // path: 'user',
    // loadChildren: () => import('./modules/my-cart-list/my-cart-list.module').then(m => m.CartListModule)
  // },
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
