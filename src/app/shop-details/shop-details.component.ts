import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';
import * as env from '../../environments/environment';
@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShopDetailsComponent implements OnInit {
  weekLists = [];
  vendorId;
  loginId;
  itemLists = [];
  curentDate = new Date();
  qtyselected: any;
  totalPrice: any;
  itemId: any;
  index: any;
  priceValueLists: any;
  selectedUnit: any;
  constructor(public modalController: ModalController, private http: HttpClient, public navParams: NavParams) {
    this.vendorId = this.navParams.get('data');
    console.log('vendorId', this.vendorId);
    this.loginId = localStorage.getItem('loginId');
    this.getItemsByVendor();
  }

  ngOnInit() {
    this.constructWeek();
  }

  constructWeek() {
    for (var i = 0; i <= 6; i++) {
      this.weekLists.push(
        {
          date: moment(this.curentDate).add(i, 'days').format("DD-MM-YYYY"),
          week: moment(this.curentDate).add(i, 'days').format("ddd"),
          num: moment(this.curentDate).add(i, 'days').format("DD"),
        }
      );
    }
  }

  getItemsByVendor() {
    this.http.get(env.environment.url + 'items/vendor/' + this.vendorId + '/user/' + this.loginId).subscribe
      (res => {
        var item = res['response'];
        for (let k = 0; k < item.length; k++) {
          (item[k].priceList[0]) ? item[k]['selectedPrice'] = item[k].priceList[0].offerPrice : [];
          (item[k].priceList[0]) ?  item[k]['isPresentInCart'] = item[k].priceList[0].isPresentInCart : false;
          this.itemLists.push(item[k]);
        }
        this.qtyselected = this.itemLists[0].priceList[0].quantity;
        this.selectedUnit = this.itemLists[0].priceList[0].unit;
        this.totalPrice = this.itemLists[0].priceList[0].offerPrice;
        this.itemId = this.itemLists[0].priceList[0]._id;
        console.log(this.itemLists);
      });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  changeQuantity(item, val, event, i) {
    let value = val.findIndex(item => (item.quantity) === event.detail.value.quantity);
    this.itemLists[i]['selectedPrice'] = this.itemLists[i].priceList[value].offerPrice;
    this.itemLists[i]['isPresentInCart'] = this.itemLists[i].priceList[value].isPresentInCart;
    this.qtyselected = event.detail.value.quantity;
    this.selectedUnit = event.detail.value.unit;
    this.totalPrice = event.detail.value.offerPrice;
    this.itemId = item._id
  }

  addedToCart(item, i) {
    this.itemLists[i]['isPresentInCart'] = true;
    let body = {
      "customerId": this.loginId,
      "vendorId": this.vendorId,
      "item": item._id,
      "selectedUnit": this.selectedUnit,
      "selectedQuantity": this.qtyselected,
      "noOfquantity": 1,
      "totalPrice": this.totalPrice
    };
    console.log(body);
    this.http.post(env.environment.url + 'cart', body).subscribe(res => {
      this.getItemsByVendor();
      console.log(res);
    });
  }

}
