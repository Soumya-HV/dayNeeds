import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';
import * as env from '../../../../environments/environment';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  @Input() mode;
  @Input() id;

  constructor(public modalController: ModalController, private fb: FormBuilder, private http: HttpClient, private commonService: commonService) {
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
    if (this.mode == 'edit') {
      console.log(this.commonService.userDetails);
      
      this.http.get(env.environment.url + 'user/' + this.commonService.userDetails._id + '/address/' + this.id).
        subscribe(res => {
          this.addressForm.patchValue({
            'userName': this.commonService.userDetails.customerDetails.userName,
            'apartmentName': this.commonService.userDetails.customerDetails?.address?.appartmentName,
            'houseNo': this.commonService.userDetails.customerDetails?.address?.houseNo,
            'blockNo': this.commonService.userDetails.customerDetails?.address?.block,
            'address': this.commonService.userDetails.customerDetails?.address?.address,
            'landmark': this.commonService.userDetails.customerDetails?.address?.landmark,
            'mblNo': this.commonService.userDetails.customerDetails?.address?.contactNumber
          });
          console.log(res);
        })
    } else {
      this.addressForm.reset();
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  submitRegForm() {
    let body = {
      "customerDetails": {
        "userName": this.addressForm.value.userName,
        "phoneNumber": this.addressForm.value.mblNo,
        "address": [{
          "_id": "61448b9b4edc594768ea16c0",
          "appartmentName": this.addressForm.value.apartmentName,
          "houseNo": this.addressForm.value.houseNo,
          "block": this.addressForm.value.blockNo,
          "address": this.addressForm.value.address,
          "landMark": this.addressForm.value.landmark,
          "contactNumber": this.addressForm.value.mblNo,
          "isDefault": true
        }]
      }
    }
    console.log(this.addressForm.value);
    this.http.put(env.environment.url + 'updateUser/' + this.commonService.userDetails._id, body).subscribe(res => {
      console.log(res);
    })
  }
}
