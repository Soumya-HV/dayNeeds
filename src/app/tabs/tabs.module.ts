import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { ShopDetailsComponent } from '../shop-details/shop-details.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage,SideMenuComponent,ShopDetailsComponent]
})
export class TabsPageModule {}
