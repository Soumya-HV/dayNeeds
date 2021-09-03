import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './shared/components/authenticate/authenticate.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { OTPComponent } from './shared/components/otp/otp.component';
import { Tab1Page } from './tab1/tab1.page';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'login',
    component: AuthenticateComponent
  },
  {
    path: 'login/authenticate',
    component: OTPComponent
  },
  {
    path: 'tab',
    loadChildren: () => import('../app/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
