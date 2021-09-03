import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
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

}
