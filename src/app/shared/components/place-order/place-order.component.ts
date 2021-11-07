import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';
import { CustomizeOrderCartComponent } from '../customize-order-cart/customize-order-cart.component';
import * as env from '../../../../environments/environment';
import { Checkout } from 'capacitor-razorpay';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  @Input() data;
  orderedDetails: any;
  // address = [{ _id: '1', typeOfAddress: 'Home', houseNo: 'No:8, A-Block,Garuda Park Square,HVResidence, Bangalore - 560049', contactNumber: '99999 99999', default: true }];
  priceDetails = [{ id: '1', name: 'Basket Value', value: '50.00' }, { id: '2', name: 'Delivery Charge', value: '00.00' }];
  vendorId;
  loginId;
  radiorewards_list = [{
    name: 'Rs.20(Rewards)',
    value: 'Rs.20(Rewards)',
    checked: true
  }];
  razorpaymentAmount;

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
  address: any;
  constructor(private router: Router, private modalController: ModalController,
    private cmnService: commonService, private http: HttpClient, private alertController: AlertController, public navCtrl:NavController,) {
    this.selectedDate = this.radio_list[0].value;
    this.address = this.cmnService.customerdeliveryAddress;
    console.log(this.address);
    
  }

  ngOnInit() {
    this.orderedDetails = JSON.parse(this.data);
    this.orderedDetails.expectedDeliveryDate = new Date();
    this.orderedDetails.deliveryAddress = this.cmnService.customerdeliveryAddress;
    this.orderedDetails.grandTotalPrice = this.orderedDetails.grandTotalPrice * 100;
    this.vendorId = this.orderedDetails.vendorId;
    this.loginId = localStorage.getItem('loginId');
    console.log(this.orderedDetails);
  }

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

  radioSelect() {

  }

  async checkoutEvent() {
    this.cmnService.present();
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

    this.http.post(env.environment.url + 'createRazorPayOrder', this.orderedDetails).subscribe(res => {
      if (res['error'] == false) {
        console.log('razorpay orderId', res['response'].razorPayOrderId);
        // this.orderedDetails.grandTotalPrice = this.orderedDetails.grandTotalPrice * 100;
        this.payWithRazorpay(res['response'].razorPayOrderId);
      }
      console.log(res);
    });
  }

  async payWithRazorpay(orderId) {
    const options = {
      key: 'rzp_test_fEVuZT5spJEQ2H',
      amount: '10000',
      description: 'Great offers',
      image: 'https://i.imgur.com/3g7nmJC.png',
      order_id: orderId,//Order ID generated in Step 1
      currency: 'INR',
      name: 'Dayneeds',
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191'
      },
      theme: {
        color: '#3399cc'
      }
    }
    try {
      this.cmnService.dismiss();
      let data = (await Checkout.open(options));
      console.log(JSON.stringify(data.response));
      this.storePaymentId(data.response);
    } catch (error) {
      this.paymentFailed(error.message); //Doesn't appear at all
    }
  }

  async storePaymentId(response) {
    this.cmnService.present();
    let params =
    {
      razorPayOrderId: response['razorpay_order_id'],
      paymentId: response['razorpay_payment_id'],
      vendorId: this.vendorId,
      customerId: this.loginId,
      razorPaySignature: response['razorpay_signature'],
      amount: this.orderedDetails.grandTotalPrice,
      currency: "INR"
    }
    console.log(params);
    this.http.post(env.environment.url + 'capturePayment', params).subscribe(res => {
      if(res['error']==false){
        this.cmnService.dismiss();
        this.modalController.dismiss();
        this.callModal();

      }
      console.log(JSON.stringify(res));
    })
    
  }

  async callModal(){
    const modal = await this.modalController.create({
      component: CustomizeOrderCartComponent,
      cssClass: '',
     componentProps: { data: 'success' },
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
    }); 
    return await modal.present();
  }

  async paymentFailed(response: string) {
    // let responseObj = JSON.parse(response)
    console.log("message" + JSON.stringify(response));
    console.log("message" + response['razorpay_payment_id']);
    const alert = await this.alertController.create({
      message: response['razorpay_payment_id'],
      backdropDismiss: true,
    });

    await alert.present();
  }


}
