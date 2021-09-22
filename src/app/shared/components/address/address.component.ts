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
  editId: any;

  constructor(public modalController: ModalController, private fb: FormBuilder, private http: HttpClient, private commonService: commonService) {
    this.addressForm = this.fb.group({
      'userName': ['', Validators.required],
      'apartmentName': ['', Validators.required],
      'houseNo': ['', Validators.required],
      'blockNo': ['', Validators.required],
      'address': ['', Validators.required],
      'landmark': ['', Validators.required],
      'mblNo': ['', Validators.required]
      // 'radio': ['', Validators.required]
    })
  }

  ngOnInit() {
    if (this.mode == 'edit') {
      console.log(this.commonService.userDetails);
      this.http.get(env.environment.url + 'user/' + this.commonService.userDetails._id + '/address/' + this.id).
        subscribe(res => {
          console.log(res);
          this.editId = res['response'].customerDetails?.address[0]?._id;
          this.addressForm.patchValue({
            'userName': res['response'].customerDetails?.address[0]?.userName,
            'apartmentName': res['response'].customerDetails?.address[0]?.appartmentName,
            'houseNo': res['response'].customerDetails?.address[0]?.houseNo,
            'blockNo': res['response'].customerDetails?.address[0]?.block,
            'address': res['response'].customerDetails?.address[0]?.address,
            'landmark': res['response'].customerDetails?.address[0]?.landMark,
            'mblNo': res['response'].customerDetails?.address[0]?.contactNumber,
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
      "address": {
        "userName": this.addressForm.value.userName,
        "appartmentName": this.addressForm.value.apartmentName,
        "houseNo": this.addressForm.value.houseNo,
        "block": this.addressForm.value.blockNo,
        "address": this.addressForm.value.address,
        "landMark": this.addressForm.value.landmark,
        "contactNumber": this.addressForm.value.mblNo,
        "typeOfAddress": 'Home',
        "isDefault": true
      }
    };

    if (this.mode == 'edit') {
      body.address['_id'] = this.editId;
    }
    console.log(this.addressForm.value);
    this.http.put(env.environment.url + 'user/' + this.commonService.userDetails._id + '/address', body.address).subscribe(res => {
      console.log(res);
      if (!res['error']) {
        this.modalController.dismiss();
      }
    })
  }

  SelectedAddress(event) {
    console.log('event', event);    
  }
}
