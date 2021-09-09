import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-cart-list',
  templateUrl: './my-cart-list.component.html',
  styleUrls: ['./my-cart-list.component.scss'],
})
export class CartListComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  
  closeModal(){
    this.modalController.dismiss();
  }
}
