import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { AddressComponent } from '../shared/components/address/address.component';
import { NotificationComponent } from '../shared/components/notification/notification.component';
import { RewardsComponent } from '../shared/components/rewards/rewards.component';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  menus = [
    {
      'name':"My Address",
      'icon':"location.svg",
      'color':"#DDEDEA"
    },
    {
      'name':"My Orders",
      'icon':"cart.svg",
      'color':"#EAF2D7"
    },
    {
      'name':"Notifications",
      'icon':"bell.svg",
      'color':"#DAEAF6"
    },
    {
      'name':"Register as Vendor ",
      'icon':"switch.svg",
      'color':"#EBDEE0"
    },
    {
      'name': 'Rewards',
      'icon': 'rewards.svg',
      'color':'#E7EBF0'
    },
    {
      'name':"Contact Us",
      'icon':"contact.svg",
      'color':"#FCE1E4"
    },
    {
      'name':"Logout",
      'icon':"log-out.svg",
      'color':"#E8DFF5"
    }

]
  constructor(public modalController: ModalController) { }

  ngOnInit() {

  }

  closeModal(){
    this.modalController.dismiss();
  }

  async opensideModal(name) {
  let cname = (name == 'Rewards') ? RewardsComponent : (name == 'Notifications') ? NotificationComponent : AddressComponent
      const modal = await this.modalController.create({
      component: cname,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }
}
