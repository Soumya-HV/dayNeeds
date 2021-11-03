import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PlaceOrderComponent } from 'src/app/shared/components/place-order/place-order.component';
import { commonService } from '../../core/services/common-service';

@Component({
  selector: 'app-customer-tabs',
  templateUrl: 'customer-tabs.page.html',
  styleUrls: ['customer-tabs.page.scss']
})
export class CustomerTabsPage {
  constructor(private router: Router, private cmnService: commonService, private modalController: ModalController) {
    console.log(this.router.url);
   
  }

  // cartListClicked() {
  //   this.cmnService.cartScreen = true;
  //   this.router.navigate(['customer/mycart']);
  // }

  // otherTabClicked() {
  //   this.cmnService.cartScreen = false;
  // }

  async checkoutEvent() {
   
  }

  navigateVendor(){
    this.router.navigate(['customer/vendor-list'])
  }
}


