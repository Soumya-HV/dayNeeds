import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  addressForm :FormGroup;
  constructor(public modalController: ModalController, private fb: FormBuilder) { 
    this.addressForm = this.fb.group({
      'userName' : ['', Validators.required],
      'apartmentName' : ['', Validators.required],
      'houseNo' : ['', Validators.required],
      'blockNo' : ['', Validators.required],
      'address' : ['', Validators.required],
      'landmark' : ['', Validators.required],
      'mblNo' : ['', Validators.required]
    })
  }

  ngOnInit() {}


    
closeModal(){
  this.modalController.dismiss();
}
}
