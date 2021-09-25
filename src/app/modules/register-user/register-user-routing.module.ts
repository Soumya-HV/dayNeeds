import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user.component';

const routes: Routes = [
  {
    path: 'user',
    component: RegisterUserComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RegisterUserRoutingModule { }
