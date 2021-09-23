import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressComponent } from '../shared/components/address/address.component';
import { ManageAddressComponent } from '../shared/components/manage-address/manage-address.component';
import { NotificationComponent } from '../shared/components/notification/notification.component';
import { RewardsComponent } from '../shared/components/rewards/rewards.component';
import { commonService } from '../core/services/common-service';
import { RegisterComponent } from '../modules/register/register.component';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
userType : any;
customerAcc: any;
vendorAcc: any;

  constructor(public modalController: ModalController,private cmnService: commonService) { }

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
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: RegisterComponent,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  openRegisterCustomer(){
    console.log('register customer')
  }


}
