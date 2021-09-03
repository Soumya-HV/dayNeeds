import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SideMenuComponent } from '../side-menu/side-menu.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public modalController: ModalController) {

  }


  async openSideModal() {
    const modal = await this.modalController.create({
      component: SideMenuComponent,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

}
