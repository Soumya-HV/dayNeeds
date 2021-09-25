import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterVendorComponent } from './register-vendor.component';

const routes: Routes = [
  {
    path: 'vendor',
    component: RegisterVendorComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RegisterVendorRoutingModule { }
