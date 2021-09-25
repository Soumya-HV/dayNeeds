import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { commonService } from '../../core/services/common-service';

@Component({
  selector: 'app-customer-tabs',
  templateUrl: 'customer-tabs.page.html',
  styleUrls: ['customer-tabs.page.scss']
})
export class CustomerTabsPage {
  constructor(private router: Router, private tabservice: commonService) {
   console.log(this.router.url);
   this.tabservice.cartScreen = (this.router.url == '/customer/mycart') ? true : false
  }

  cartListClicked() {
      this.tabservice.cartScreen = true;
      this.router.navigate(['customer/mycart']);
  }

  otherTabClicked() {
    this.tabservice.cartScreen = false;
  }

}
