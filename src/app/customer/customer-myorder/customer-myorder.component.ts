import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { commonService } from '../../core/services/common-service';
import { HttpClient } from '@angular/common/http';
import * as env from '../../../environments/environment';
@Component({
  selector: 'app-customer-myorder',
  templateUrl: './customer-myorder.component.html',
  styleUrls: ['./customer-myorder.component.scss'],
})
export class CustomerMyOrderComponent implements OnInit {
  showDetails = false;
  loginId;
  orderLists: any;
  // orderedItems = [];
  orderedItems = [{ id: 1, name: 'Onion', qty: '100g', qtyno: '1', price: '50.00' }, { id: 1, name: 'Tomatoes', qty: '500g', qtyno: '1', price: '30.00' }, { id: 1, name: 'Okra', qty: '200g', qtyno: '1', price: '70.00' }];
  orderDetails = {
    "response": [
      {
        "deliveryAddress": {
          "isDefault": false,
          "isDeliveryAddress": false,
          "userName": "Pappuraj",
          "appartmentName": "Shoba Dream Gardens",
          "houseNo": "49A",
          "floorNo": "2nd Floor",
          "block": "B-Block",
          "address": "vadugayar east street",
          "landMark": "rajapalyam",
          "contactNumber": 7777777777,
          "typeOfAddress": "home"
        },
        "id": "617d57669753275578d85fb4",
        "orderdItems": [
          {
            "recurring": {
              "day": []
            },
            "_id": "617d55f17b66d555782c5f7f",
            "item": "615b3dd8b83f724e54b4a28a",
            "selectedUnit": "KG",
            "selectedQuantity": 1,
            "selectedItemPrice": 50,
            "noOfquantity": 1,
            "totalPrice": 50
          },
          {
            "recurring": {
              "day": []
            },
            "_id": "617d55f938d91355780e7003",
            "item": "615b3dd8b83f724e54b4a28a",
            "selectedUnit": "KG",
            "selectedQuantity": 2,
            "selectedItemPrice": 90,
            "noOfquantity": 1,
            "totalPrice": 90
          }
        ],
        "customerId": "6173f37bfb4f1600088a2f17",
        "grandTotalPrice": 140,
        "vendorId": "615005ccbee3c20009033cb4",
        "deliveryCharge": 50,
        "currency": "INR",
        "expectedDeliveryDate": "2021-10-30T14:29:55.992Z",
        "razorPayOrderId": "order_IFa6ihVQ0UQbQx",
        "createdDate": "2021-10-30T14:32:06.671Z",
        "v": 0,
        "orderStatus": "ordered",
        "razorPayPaymentId": "pay_IFa6o0p9ux6C4q"
      },
      {
        "deliveryAddress": {
          "isDefault": false,
          "isDeliveryAddress": false,
          "userName": "Pappuraj",
          "appartmentName": "Shoba Dream Gardens",
          "houseNo": "49A",
          "floorNo": "2nd Floor",
          "block": "B-Block",
          "address": "vadugayar east street",
          "landMark": "rajapalyam",
          "contactNumber": 7777777777,
          "typeOfAddress": "home"
        },
        "_id": "617d58b6e7ecbd4cc0078747",
        "orderdItems": [
          {
            "recurring": {
              "day": []
            },
            "_id": "617d5868090f2f5578c891a9",
            "item": "615b3dd8b83f724e54b4a28a",
            "selectedUnit": "KG",
            "selectedQuantity": 1,
            "selectedItemPrice": 50,
            "noOfquantity": 1,
            "totalPrice": 50
          },
          {
            "recurring": {
              "day": []
            },
            "_id": "617d5871652a7e5578f4fb71",
            "item": "615b3dd8b83f724e54b4a28a",
            "selectedUnit": "KG",
            "selectedQuantity": 2,
            "selectedItemPrice": 90,
            "noOfquantity": 1,
            "totalPrice": 90
          }
        ],
        "customerId": "6173f37bfb4f1600088a2f17",
        "grandTotalPrice": 140,
        "vendorId": "615005ccbee3c20009033cb4",
        "deliveryCharge": 50,
        "currency": "INR",
        "expectedDeliveryDate": "2021-10-30T14:35:51.096Z",
        "razorPayOrderId": "order_IFaCdHYEVXq71M",
        "createdDate": "2021-10-30T14:37:42.507Z",
        "v": 0,
        "orderStatus": "ordered",
        "razorPayPaymentId": "pay_IFaCm3LZ0Rxjoq"
      },
      {
        "deliveryAddress": {
          "isDefault": false,
          "isDeliveryAddress": false,
          "userName": "Pappuraj",
          "appartmentName": "Shoba Dream Gardens",
          "houseNo": "49A",
          "floorNo": "2nd Floor",
          "block": "B-Block",
          "address": "vadugayar east street",
          "landMark": "rajapalyam",
          "contactNumber": 7777777777,
          "typeOfAddress": "home"
        },
        "_id": "617d595a18a26b6af042a82f",
        "orderdItems": [
          {
            "recurring": {
              "day": []
            },
            "_id": "617d5868090f2f5578c891a9",
            "item": "615b3dd8b83f724e54b4a28a",
            "selectedUnit": "KG",
            "selectedQuantity": 1,
            "selectedItemPrice": 50,
            "noOfquantity": 1,
            "totalPrice": 50
          },
          {
            "recurring": {
              "day": []
            },
            "_id": "617d5871652a7e5578f4fb71",
            "item": "615b3dd8b83f724e54b4a28a",
            "selectedUnit": "KG",
            "selectedQuantity": 2,
            "selectedItemPrice": 90,
            "noOfquantity": 1,
            "totalPrice": 90
          }
        ],
        "customerId": "6173f37bfb4f1600088a2f17",
        "grandTotalPrice": 140,
        "vendorId": "615005ccbee3c20009033cb4",
        "deliveryCharge": 50,
        "currency": "INR",
        "expectedDeliveryDate": "2021-10-30T14:38:35.324Z",
        "razorPayOrderId": "order_IFaFVqNfHcO1Oy",
        "createdDate": "2021-10-30T14:40:26.101Z",
        "_v": 0,
        "orderStatus": "ordered",
        "razorPayPaymentId": "pay_IFaFbKYm4KD4s4"
      }
    ]
  }

  constructor(public modalController: ModalController, private router: Router, private tabService: commonService, private http: HttpClient) {
    this.loginId = localStorage.getItem('loginId');
  }

  ngOnInit() { }

  ionViewWillEnter() {
    // this.orderedItems = this.orderDetails['response']; 
    console.log(this.orderedItems, this.orderDetails);
    
    this.http.get(env.environment.url + 'customer/' + this.loginId + '/orders').subscribe(res => {
      console.log(res);
      // this.orderedItems = res['reponse']; 
    })
  }

  backHome() {
    this.router.navigate(['customer/vendor-list']);

  }
}
