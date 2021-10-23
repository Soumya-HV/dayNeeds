import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { commonService } from '../../core/services/common-service';

@Component({
  selector: 'app-customer-myorder',
  templateUrl: './customer-myorder.component.html',
  styleUrls: ['./customer-myorder.component.scss'],
})
export class CustomerMyOrderComponent implements OnInit {
  showDetails = false;
  orderedItems = [{ id: 1, name: 'Onion', qty: '100g', qtyno: '1', price: '50.00' }, { id: 1, name: 'Tomatoes', qty: '500g', qtyno: '1', price: '30.00' }, { id: 1, name: 'Okra', qty: '200g', qtyno: '1', price: '70.00' }];
  constructor(public modalController: ModalController, private router: Router, private tabService: commonService) { }

  ngOnInit() { }

  backHome() {
    this.router.navigate(['customer/vendor-list']);

  }
}
