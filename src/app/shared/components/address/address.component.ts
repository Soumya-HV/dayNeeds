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
  defaultSelected = "radio_2";
  //Get value on ionChange on IonRadioGroup
  selectedGroup: any;
  //Get value on ionSelect on IonRadio item
  selectedItem: any;

  radio_list = [
    {
      name: 'Home',
      value: 'home',
      checked: false,
    }, {
      name: 'Office',
      value: 'office',
      checked: true,

    }, {
      name: 'Other',
      value: 'other',
      checked: false,
    },
  ];

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
          for (let i = 0; i < this.radio_list.length; i++) {
            this.radio_list[i].checked = false;
            if (res['response'].customerDetails?.address[0]?.typeOfAddress == this.radio_list[i].value) {
              this.radio_list[i].checked = true;
            }
          }
        })
    } else {
      this.addressForm.reset();
    }
  }

  onSelectionChange(val) {
    console.log(val);
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
        "typeOfAddress": this.selectedGroup.value,
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

  radioGroupChange(event) {
    console.log("radioGroupChange", event.detail);
    this.selectedGroup = event.detail;
  }

  radioFocus() {
    console.log("radioFocus");
  }
  radioSelect(event) {
    console.log("radioSelect", event.detail);
    this.selectedItem = event.detail;
  }
  radioBlur() {
    console.log("radioBlur");
  }
}
