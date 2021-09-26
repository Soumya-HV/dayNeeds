import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { SideMenuVendorComponent } from 'src/app/sidemenu-vendor/sidemenu-vendor.component';

@Component({
  selector: 'app-vendor-home',
  templateUrl: 'vendor-home.page.html',
  styleUrls: ['vendor-home.page.scss']
})
export class VendorHomePage {

  constructor(public modalController: ModalController) {}

  async openSideModal(name) {
    let cname = (name == 'notification') ? NotificationComponent : SideMenuVendorComponent
    const modal = await this.modalController.create({
      component: cname,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

}
