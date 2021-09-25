import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './vendor-tabs-routing.module';
import { VendorTabs } from './vendor-tabs.page';
import { SideMenuVendorComponent } from 'src/app/sidemenu-vendor/sidemenu-vendor.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [VendorTabs,SideMenuVendorComponent]
})
export class VendorTabsPageModule {}
