import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vendor-shopdetails',
  templateUrl: './vendor-shopdetails.component.html',
  styleUrls: ['./vendor-shopdetails.component.scss'],
})
export class VendorShopdetailsComponent implements OnInit {
  addDelivery = false;
  address = [{ _id: '1', houseNo: '8', block: 'A-Block', appartmentName: 'Garuda Park Square', landMark: 'HVResidence', address: 'Bangalore - 560049', contactNumber: '99999 99999', shopName: 'RK Vegetables' }];
  constructor(public modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() { }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Cart Value'
        },
        {
          name: 'name2',
          type: 'text',
          value: 'hello',
          placeholder: 'Delivery Charges'
        },],
      buttons: [{
        text: 'Ok',
        cssClass: 'addBtn',
        handler: () => {
          console.log('Confirm Ok');
        }
      }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  addDeliveryCharges() {
    this.addDelivery = true;
    this.presentAlert();
  }
}
