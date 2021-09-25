import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { commonService } from '../../core/services/common-service';

@Component({
  selector: 'app-mycart',
  templateUrl: 'mycart.page.html',
  styleUrls: ['mycart.page.scss']
})
export class MyCartPage {
  noOfProducts: number = 1;
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

  stockLists = [{
    catName: 'Upload Prescription',
    bgColor: '#EBDEE0',
    catDetails: [{
      id: 1, image: '../../assets/images/pharmacy.svg', pName: 'BP Tablet',
      qty: '15', price: 120.00, qtyno: 1
    }]
  }];

  constructor(private router: Router, private tabService: commonService) { }

  ngOnInit() { }

  reduceNumber() {
    if (this.noOfProducts > 0) {
      this.noOfProducts -= 1;
    }
  }

  increaseNumber() {
    this.noOfProducts += 1;
  }

  backHome() {
    this.router.navigate(['customer/vendor-list']);
    this.tabService.cartScreen = false;
  }

  displayImg() {

  }
}