import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { commonService } from '../core/services/common-service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private router: Router, private tabservice: commonService) {
   console.log(this.router.url);
   this.tabservice.cartScreen = (this.router.url == '/customer/tab3') ? true : false
  }

  cartListClicked() {
      this.tabservice.cartScreen = true;
      this.router.navigate(['customer/tab3']);
  }

  otherTabClicked() {
    this.tabservice.cartScreen = false;
  }

}
