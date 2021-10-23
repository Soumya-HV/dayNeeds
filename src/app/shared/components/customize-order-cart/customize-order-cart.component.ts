import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-customize-order-cart',
  templateUrl: './customize-order-cart.component.html',
  styleUrls: ['./customize-order-cart.component.scss'],
})
export class CustomizeOrderCartComponent implements OnInit {
  success = false;
  error = true;
  replace = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  backToCart() {
    window.location.reload();
  }

}
