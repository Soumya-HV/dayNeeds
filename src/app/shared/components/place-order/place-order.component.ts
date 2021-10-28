import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';
import { CustomizeOrderCartComponent } from '../customize-order-cart/customize-order-cart.component';
import * as env from '../../../../environments/environment';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  address = [{ _id: '1', typeOfAddress: 'Home', houseNo: 'No:8, A-Block,Garuda Park Square,HVResidence, Bangalore - 560049', contactNumber: '99999 99999', default: true }];
  orderDetails = [{ id: '1', name: 'Basket Value', value: '50.00' }, { id: '2', name: 'Delivery Charge', value: '00.00' }];



  radiorewards_list = [{
    name: 'Rs.20(Rewards)',
    value: 'Rs.20(Rewards)',
    checked: true
  }];

  radio_list = [
    {
      name: 'Today , 4:00pm',
      value: 'home',
    }, {
      name: '17th May, Wednesday, 10:00am',
      value: 'office',
    }, {
      name: 'Order Now(Delivery Charge Rs:50)',
      value: 'other',
    },
  ];

  selectedDate: any;

  constructor(private router: Router, private modalController: ModalController,
    private cmnService: commonService, private http: HttpClient,) {
    this.selectedDate = this.radio_list[0].value;
    console.log(this.cmnService.checkoutAmount);
  }

  ngOnInit() { }

  backHome() {
    console.log('cart');
    // this.router.navigateByUrl('customer/mycart');
    this.modalController.dismiss();
  }

  // radioGroupChange(event) {
  //   console.log("radioGroupChange", event.detail);
  //   this.selectedGroup = event.detail;
  // }

  // radioFocus() {
  //   console.log("radioFocus");
  // }

  radioGroupChange() {
    console.log(this.selectedDate);
  }

  radioBlur() {
    console.log("radioBlur");
  }

  radioSelect(){

  }

  async checkoutEvent() {
    //  let params = {
    //    'totalPrice':50000,
    //    'currency':'INR'
    //  }
    // const modal = await this.modalController.create({
    //   component: CustomizeOrderCartComponent,
    //   // componentProps: { data: 'success' },
    //   cssClass: 'sideMenuModal'
    // });
    // modal.onDidDismiss().then((data) => {
    // });
    // return await modal.present();

    this.http.post(env.environment.url + 'createRazorPayOrder', this.cmnService.checkoutAmount).subscribe(res => {
      console.log(res);
    });
  }
}
