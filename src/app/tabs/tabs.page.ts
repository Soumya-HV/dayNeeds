import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  cartScreen = false;
  constructor(private router: Router) {
   
  }

  cartListClicked() {
      this.cartScreen = true;
      this.router.navigate(['tab/tab4']);
  }

  otherTabClicked() {
    this.cartScreen = false;
  }

}
