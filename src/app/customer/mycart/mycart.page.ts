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
  cartItems =[];
  fullResponse: any;
  vendorId;
  dummy = Array(10);

  constructor(private router: Router, private cmnService: commonService, private http: HttpClient,
    private modalController: ModalController) {
    this.loginId = localStorage.getItem('loginId');
    

  }

  ionViewWillEnter() {
    this.dummy = Array(10);
    this.getMyCartLists();
  }
 

  ngOnInit() { }

  reduceNumber() {
    if (this.noOfProducts > 0) {
      this.noOfProducts -= 1;
    }
  }


  decreaseQuantity(cart, index) {    
    if (this.cartItems[index].noOfquantity > 0) {
      this.cartItems[index].noOfquantity -= 1;
      this.cartItems[index].totalPrice = this.cartItems[index].noOfquantity * this.cartItems[index].selectedItemPrice;
      let post = {
        "quantity": this.cartItems[index].noOfquantity,
        "totalPrice": this.cartItems[index].totalPrice
      }
      this.http.put(env.environment.url + 'cart/' + cart._id + '/updatequantity', post).subscribe(res => {
        console.log(res);
      });
      if(this.cartItems[index].noOfquantity == 0) {
        this.presentAlertConfirm(cart);
      }
    } 
  }

  increaseQuantity(cart, index) {
    this.fullResponse.grandTotalPrice = this.fullResponse.grandTotalPrice + this.cartItems[index].selectedItemPrice;
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
      this.dummy =[];
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
      componentProps: { data: JSON.stringify(params) },
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
