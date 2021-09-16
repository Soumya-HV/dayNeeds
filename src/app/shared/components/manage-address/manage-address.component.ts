import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss'],
})
export class ManageAddressComponent implements OnInit {
  address = [{ id: '1', deliverTo: 'Home', deliverAddress: 'No:8, A-Block,Garuda Park Square, HVResidence, Bangalore - 560049', deliverNum: '99999 99999', default: true },
  { id: '2', deliverTo: 'Office', deliverAddress: 'No:8, A-Block,Garuda Park Square, HVResidence, Bangalore - 560049', deliverNum: '99999 99999', default: false }];
  constructor(public modalController: ModalController,) { }

  ngOnInit() { }


  closeModal() {
    this.modalController.dismiss();
  }

  async opensideModal(mode) {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: AddressComponent,
      cssClass: 'sideMenuModal',
      componentProps: {mode: mode}
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

}
