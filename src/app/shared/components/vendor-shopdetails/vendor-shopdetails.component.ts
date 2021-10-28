import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vendor-shopdetails',
  templateUrl: './vendor-shopdetails.component.html',
  styleUrls: ['./vendor-shopdetails.component.scss'],
})
export class VendorShopdetailsComponent implements OnInit {
  addDelivery = false;
  address = [{ _id: '1', houseNo: '8', block: 'A-Block', appartmentName: 'Garuda Park Square', landMark: 'HVResidence', address: 'Bangalore - 560049', contactNumber: '99999 99999', shopName: 'RK Vegetables' }];
  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  closeModal(){
    this.modalController.dismiss();
  }

  addDeliveryCharges() {
    this.addDelivery =true;
  }
}
