import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { commonService } from '../../core/services/common-service';
import * as env from '../../../environments/environment';
import { PlaceOrderComponent } from 'src/app/shared/components/place-order/place-order.component';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-mycart',
  templateUrl: 'mycart.page.html',
  styleUrls: ['mycart.page.scss']
})
export class MyCartPage {
  noOfProducts: number = 1;
  loginId;
  cartItems: any;
  fullResponse: any;
  vendorId;
  // stockLists = [{
  // catName: 'RK Vegetables',
  // catDetails: [{ id: 1, image: '../../assets/images/chilli.svg', pName: 'Green Chilli', qty: '100g', price: 80, qtyno: 1 },
  // { id: 2, image: '../../assets/images/tomato.svg', pName: 'Tomato', qty: '1kg', price: 100, qtyno: 1 }]
  // }];

  // stockLists = [{
  // catName: 'Dairy Products',
  // bgColor: '#F8D4EF',
  // catDetails: [{
  // id: 1, image: '../../assets/images/nsm.svg', pName: 'Nandini Special Toned Milk',
  // qty: '500ml', price: 80, qtyno: 1, coupons: 30, required: 'Alternate Days', DOA: 'March 2021'
  // },
  // {
  //  id: 1, image: '../../assets/images/nsm.svg', pName: 'Nandini Doubled Toned Milk',
  //  qty: '500ml', price: 100, qtyno: 1, coupons: 8, required: 'Weekends', DOA: 'March 2021'
  // }]
  // }];
  // 
  // stockLists = [{
  // catName: 'JJ Carwash',
  // bgColor: '#F2F4F8',
  // catDetails: [{
  // id: 1, image: '../../assets/images/carwash.svg', pName: 'Car Wash',
  // on: '4:00 pm', price: 2000, noOfWashes: 4 , required: 'Sunday', DOA: 'March 2021'
  // }]
  // }];

  // stockLists = [{
  //   catName: 'Upload Prescription',
  //   bgColor: '#EBDEE0',
  //   catDetails: [{
  //     id: 1, image: '../../assets/images/pharmacy.svg', pName: 'BP Tablet',
  //     qty: '15', price: 120.00, qtyno: 1
  //   }]
  // }];

  constructor(private router: Router, private cmnService: commonService, private http: HttpClient,
    private modalController: ModalController) {
    this.loginId = localStorage.getItem('loginId');

  }

  ionViewWillEnter() {
    this.getMyCartLists();
  }

  ngOnInit() { }

  reduceNumber() {
    if (this.noOfProducts > 0) {
      this.noOfProducts -= 1;
    }
  }

  decreaseQuantity(cart, index) {
    this.cartItems[index].noOfquantity -= 1;
    this.cartItems[index].totalPrice = this.cartItems[index].noOfquantity * this.cartItems[index].selectedItemPrice;
    let post = {
      "quantity": this.cartItems[index].noOfquantity,
      "totalPrice": this.cartItems[index].totalPrice
    }
    this.http.put(env.environment.url + 'cart/' + cart._id + '/updatequantity', post).subscribe(res => {
      console.log(res);
    });
  }
  increaseQuantity(cart, index) {
    this.cartItems[index].noOfquantity += 1;
    this.cartItems[index].totalPrice = this.cartItems[index].noOfquantity * this.cartItems[index].selectedItemPrice;
    let post = {
      "quantity": this.cartItems[index].noOfquantity,
      "totalPrice": this.cartItems[index].totalPrice
    }
    this.http.put(env.environment.url + 'cart/' + cart._id + '/updatequantity', post).subscribe(res => {
      console.log(res);
    });
  }

  getMyCartLists() {
    this.http.get(env.environment.url + 'carts/customer/' + this.loginId).subscribe(res => {
      this.fullResponse = res['response'];
      this.vendorId = res['response'].vendorId;
      this.cartItems = res['response'].cartItems;
      console.log(this.cartItems);
    });
  }

  increaseNumber() {
    this.noOfProducts += 1;
  }

  backHome() {
    this.router.navigate(['customer/vendor-list']);
  }

  presentAlertConfirm(data) {
    var index = this.cartItems.map(x => {
      return x._id;
    }).indexOf(data._id);

    this.cartItems.splice(index, 1);
    this.http.delete(env.environment.url + 'cart/' + data._id).subscribe(res => {
      console.log(res);
    });
  }

  async checkoutEvent() {
    // var options = {
    //   'totalPrice': 50000,  // amount in the smallest currency unit
    //   'currency': "INR",
    // };
    // this.cmnService.checkoutAmount = options;
    let params = {
      'orderdItems': this.cartItems,
      'customerId': this.loginId,
      'grandTotalPrice': this.fullResponse.grandTotalPrice,
      'vendorId': this.vendorId,
      'deliveryCharge': 50,
      'currency': "INR",
    }
    const modal = await this.modalController.create({
      component: PlaceOrderComponent,
      componentProps: { data : JSON.stringify(params) },
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
    console.log('checkout open')
  }

  displayImg() {

  }
}
