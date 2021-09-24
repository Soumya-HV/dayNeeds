import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerTabsPageRoutingModule } from './customer-tabs-routing.module';
import { CustomerTabsPage } from './customer-tabs.page';
import { SideMenuComponent } from '../../side-menu/side-menu.component';
import { ShopDetailsComponent } from '../../shop-details/shop-details.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomerTabsPageRoutingModule
  ],
  declarations: [CustomerTabsPage,SideMenuComponent,ShopDetailsComponent]
})
export class CustomerTabsPageModule {}

