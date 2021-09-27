import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressComponent } from '../shared/components/address/address.component';
import { ManageAddressComponent } from '../shared/components/manage-address/manage-address.component';
import { NotificationComponent } from '../shared/components/notification/notification.component';
import { RewardsComponent } from '../shared/components/rewards/rewards.component';
import { commonService } from '../core/services/common-service';
import { Router } from '@angular/router';
import { ShopDetailsComponent } from '../shop-details/shop-details.component';
import { VendorShopdetailsComponent } from '../shared/components/vendor-shopdetails/vendor-shopdetails.component';
import { VendorPaymentComponent } from '../shared/components/vendor-payment/vendor-payment.component';
import { AddSubUserComponent } from '../shared/components/add-sub-user/add-sub-user.component';

@Component({
  selector: 'app-sidemenu-vendor',
  templateUrl: './sidemenu-vendor.component.html',
  styleUrls: ['./sidemenu-vendor.component.scss'],
})
export class SideMenuVendorComponent implements OnInit {
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

  async openShopDetailsModel() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: VendorShopdetailsComponent,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  async openAddUser() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: AddSubUserComponent,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  async openPaymentModel() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: VendorPaymentComponent,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  // async openRegisterVendor(){
  //   console.log('register to vendor');
  //   this.modalController.dismiss();
  //   this.router.navigate(['register/vendor']);
  // }

  async openRegisterCustomer(){
    console.log('register to customer');
    this.modalController.dismiss();
    this.router.navigate(['register/user']);
    // const modal = await this.modalController.create({
    //   component: RegisterUserComponent,
    //   cssClass: 'sideMenuModal'
    // });
    // modal.onDidDismiss().then((data) => {
    // });
    // return await modal.present();
  }

  // switchVendor(){
  //   this.modalController.dismiss();
  //   localStorage.setItem('userType', 'vendor');
  //   this.router.navigate(['vendor/home']);
  // }

  switchCustomer(){
    this.modalController.dismiss();
    localStorage.setItem('userType', 'customer');
    this.router.navigate(['customer/home']);
   
  }


}
