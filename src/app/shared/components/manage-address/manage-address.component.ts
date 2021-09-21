import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressComponent } from '../address/address.component';
import { commonService } from 'src/app/core/services/common-service';
import * as env from '../../../../environments/environment';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss'],
})
export class ManageAddressComponent implements OnInit {
  // address = [{ _id: '1', deliverTo: 'Home', deliverAddress: 'No:8, A-Block,Garuda Park Square, HVResidence, Bangalore - 560049', deliverNum: '99999 99999', default: true },
  // { _id: '2', deliverTo: 'Office', deliverAddress: 'No:8, A-Block,Garuda Park Square, HVResidence, Bangalore - 560049', deliverNum: '99999 99999', default: false }];
  address: any;

  constructor(public modalController: ModalController, private commonService:commonService, private http:HttpClient) { }

  ngOnInit() { 
    console.log(this.commonService.userDetails.customerDetails.address);
    this.http.get(env.environment.url + 'user/' + this.commonService.userDetails.customerDetails._id).subscribe
    (res => {
        this.commonService.userDetails = res['response'];
        this.address = this.commonService.userDetails.customerDetails.address;
        console.log(res, this.commonService.userDetails);
      });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async opensideModal(mode, id) {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: AddressComponent,
      cssClass: 'sideMenuModal',
      componentProps: { mode: mode , id: id }
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

}
