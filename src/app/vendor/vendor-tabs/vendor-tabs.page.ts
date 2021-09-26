import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-tabs',
  templateUrl: 'vendor-tabs.page.html',
  styleUrls: ['vendor-tabs.page.scss']
})
export class VendorTabs {
  homeIcon = '../../../assets/images/vendor-tab-icons/home-tab.svg';
  clickedHomeIcon = '../../../assets/images/vendor-tab-icons/clickedHome-tab.svg';

  productIcon = '../../../assets/images/vendor-tab-icons/product-tab.svg';
  clickedProductIcon = '../../../assets/images/vendor-tab-icons/clickedProduct-tab.svg';

  scheduleIcon = '../../../assets/images/vendor-tab-icons/schedule-tab.svg';
  clickedScheduleIcon = '../../../assets/images/vendor-tab-icons/clickedSchedule-tab.svg';

  ordertabIcon = '../../../assets/images/vendor-tab-icons/order-tab.svg';
  clickedOrdertabIcon = '../../../assets/images/vendor-tab-icons/clickedOrder-tab.svg';

  ishomeSelected = false;
  isproductSelected= true;
  isscheduleSelected = true;
  isorderSelected= true;

  constructor() {}

  changeHomeIcon() {    
    this.resetAll();
    this.ishomeSelected = false;
  }

  changeProductIcon() {
   this.resetAll();
   this.isproductSelected = false;
  }

  changeScheduleIcon() {    
    this.resetAll();
    this.isscheduleSelected = false;
  }

  changeOrderIcon() {
   this.resetAll();
   this.isorderSelected = false;
  }

  resetAll(){
    this.ishomeSelected = true;
    this.isproductSelected= true;
    this.isscheduleSelected = true;
    this.isorderSelected= true;

  }

}
