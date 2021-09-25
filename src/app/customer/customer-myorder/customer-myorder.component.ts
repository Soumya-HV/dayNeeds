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
  showDetails =false;
  constructor(public modalController: ModalController,private router: Router, private tabService: commonService) { }

  ngOnInit() { }

  backHome() {
    this.router.navigate(['customer/vendor-list']);
    
  }
}
