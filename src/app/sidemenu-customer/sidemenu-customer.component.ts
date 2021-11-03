import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressComponent } from '../shared/components/address/address.component';
import { ManageAddressComponent } from '../shared/components/manage-address/manage-address.component';
import { NotificationComponent } from '../shared/components/notification/notification.component';
import { RewardsComponent } from '../shared/components/rewards/rewards.component';
import { commonService } from '../core/services/common-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu-customer',
  templateUrl: './sidemenu-customer.component.html',
  styleUrls: ['./sidemenu-customer.component.scss'],
})
export class SideMenuCustomerComponent implements OnInit {
userType : any;
customerAcc: any;
vendorAcc: any;


  constructor(public modalController: ModalController,private cmnService: commonService,
    private router: Router) { }

  ngOnInit() {
    this.userType = localStorage.getItem('userType');
    this.customerAcc = this.cmnService.customerAccount;
    this.vendorAcc = this.cmnService.vendorAccount;
    console.log("customer",this.customerAcc);
    console.log("vendor",this.vendorAcc);
    console.log('usertype',this.userType);   
  }
  
  logOutEvent() {
    localStorage.clear();
    this.modalController.dismiss();
    this.router.navigateByUrl('/login');
  }

  closeModal() {
    this.modalController.dismiss();
  }


  async openRewardModel() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: RewardsComponent,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  async openNotificationModel() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: NotificationComponent,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  async openManageAddrModel() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: ManageAddressComponent,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  async openRegisterVendor(){
    console.log('register to vendor');
    this.modalController.dismiss();
    this.router.navigate(['register/vendor']);
  }

  // async openRegisterCustomer(){
  //   console.log('register to customer');
  //   this.modalController.dismiss();
  //   this.router.navigate(['register/user']);
  // }

  switchVendor(){
    this.modalController.dismiss();
    localStorage.setItem('userType', 'vendor');
    this.router.navigate(['vendor/home']);
  }

  openOrders(){
    this.modalController.dismiss();
    this.router.navigate(['user/location']);
  }

  // switchCustomer(){
  //   this.modalController.dismiss();
  //   localStorage.setItem('userType', 'customer');
  //   this.router.navigate(['customer/home']);
  // }


}
