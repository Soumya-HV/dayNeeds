import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-customize-order-cart',
  templateUrl: './customize-order-cart.component.html',
  styleUrls: ['./customize-order-cart.component.scss'],
})
export class CustomizeOrderCartComponent implements OnInit {
  @Input() data;


  constructor(private modalController: ModalController, private router: Router) { }

  ngOnInit() {
  }

  backToCart() {
    this.modalController.dismiss();
    // window.location.reload();
    this.router.navigate(['customer/home'])
  }

}
