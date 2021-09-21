import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vendor-payment',
  templateUrl: './vendor-payment.component.html',
  styleUrls: ['./vendor-payment.component.scss'],
})
export class VendorPaymentComponent implements OnInit {
  vendorPaymentForm: FormGroup;
  userRewards = [{ id: 1, amount: '500', type: 'Total Earnings', color: '#2A3757' }, { id: 1, amount: '300', type: 
 'In Wallet', color: '#FF7043' }];
  
  constructor(private fb:FormBuilder, public modalController: ModalController) { 
    this.vendorPaymentForm = this.fb.group({
      'userName': ['', Validators.required],
      'acNo': ['', Validators.required],
      'IFSCNo': ['', Validators.required],
      'GSTNo': ['', Validators.required],
      'TANNo': ['', Validators.required]
    })
  }

  ngOnInit() {}


  closeModal() {
    this.modalController.dismiss();
  }

}
