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

  constructor(public modalController: ModalController, private commonService: commonService, private http: HttpClient) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.http.get(env.environment.url + 'user/' + localStorage.getItem('user_id')).subscribe
      (res => {
        this.commonService.userDetails = res['response'];
        this.address = res['response']?.customerDetails?.address
      });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  onSelectionChange($event, id, i) {
    console.log(id, $event, i, this.address);
    for (let j = 0; j < this.address.length; j++) {
      if (this.address[j]?._id == id) {
        this.address[j]['isDeliveryAddress'] = true;
      } else {
        this.address[j]['isDeliveryAddress'] = false;
      }
    }
    // (this.address[i]['isDeliveryAddress']) ? this.address[i]['isDeliveryAddress'] = false :  this.address[i]['isDeliveryAddress'] = true ;

    // let PKQ = this.address.filter(x => x.isDeliveryAddress == true)[0];
    // this.address[this.address.indexOf(PKQ)].isDeliveryAddress = false;
    // this.address[i].isDeliveryAddress = true;
    // console.log(PKQ);
    // 

    // let idFound = this.address.filter(x => x._id == id);   
    // this.address[this.address.indexOf(idFound[0])].isDeliveryAddress = true;
    // // console.log(idFound,this.address.indexOf(idFound[0]), this.address[this.address.indexOf(idFound[0])], this.address);

    // this.address[i]['isDeliveryAddress'] = true;
    // this.address[this.address.indexOf(idFound[0])].isDeliveryAddress = true;

    // for (let j = 0; j < this.address.length; j++) {
    // if (this.address[j]?._id == id) {
    // console.log(id, this.address[j]?._id);
    // this.address[j]['isDeliveryAddress'] = true;
    // }
    // }
    console.log(this.address);

    // this.http.put(env.environment.url + 'user/' + localStorage.getItem('loginId') + '/address/' + id + '/deliveryAddress/' + true, {}).subscribe
    // (res => {
    // console.log(res);
    // });
  
  }

  async opensideModal(mode, id) {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: AddressComponent,
      cssClass: 'sideMenuModal',
      componentProps: { mode: mode, id: id }
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

}
