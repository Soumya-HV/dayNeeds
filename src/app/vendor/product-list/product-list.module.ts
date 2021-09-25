import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListPage } from './product-list.page';
import { ProductListPageRoutingModule } from './product-list-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProductListPageRoutingModule
  ],
  declarations: [ProductListPage]
})
export class ProductListPageModule {}
