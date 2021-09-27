import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vendor-dabbastory',
  templateUrl: './vendor-dabbastory.component.html',
  styleUrls: ['./vendor-dabbastory.component.scss'],
})

export class VendorDabbastoryComponent implements OnInit {
  productDetailsForm: FormGroup;
  constructor(public modalController: ModalController, private fb: FormBuilder) {
    this.productDetailsForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      type: ['', Validators.required],
      style: ['', Validators.required],
      price: ['', Validators.required],
      ingredient: ['', Validators.required]
    })
  }
  ngOnInit() { }

  submitForm() {

  }

  closeModal(){
    this.modalController.dismiss();
  }

}
