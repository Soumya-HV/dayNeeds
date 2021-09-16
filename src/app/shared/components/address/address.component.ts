import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  @Input() mode;

  constructor(public modalController: ModalController, private fb: FormBuilder, private http:HttpClient) {
    this.addressForm = this.fb.group({
      'userName': ['', Validators.required],
      'apartmentName': ['', Validators.required],
      'houseNo': ['', Validators.required],
      'blockNo': ['', Validators.required],
      'address': ['', Validators.required],
      'landmark': ['', Validators.required],
      'mblNo': ['', Validators.required]
    })
  }

  ngOnInit() {
    console.log(this.mode);

  }

  closeModal() {
    this.modalController.dismiss();
  }

  submitRegForm() {
    let body = {
      "customerDetails": {
        "userName": this.addressForm.value.userName,
        "phoneNumber": this.addressForm.value.mblNo,
        "address": {
          "appartmentName": this.addressForm.value.apartmentName,
          "Lane":  this.addressForm.value.landmark,
          "Phase":  this.addressForm.value.address,
          "Block": this.addressForm.value.blockNo,
          "Floor":  this.addressForm.value.houseNo
        }
      }
  }
    console.log(this.addressForm.value); 
    this.http.put('http://localhost:3000/prod/updateUser/6130c0b008e52f0b88921e00', body.customerDetails).subscribe(res => {
      console.log(res);
    })   
  }
}
