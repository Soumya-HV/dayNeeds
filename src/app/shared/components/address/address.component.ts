import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';
import * as env from '../../../../environments/environment';
import { SelectApartmentComponent } from '../select-apartment/select-apartment.component';
import { SelectBlockComponent } from '../select-block/select-block.component';
import { SelectFloorComponent } from '../select-floor/select-floor.component';


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
      value: 'Home',
      checked: true,
    }, {
      name: 'Office',
      value: 'Office',
      checked: false,

    }, {
      name: 'Other',
      value: 'Other',
      checked: false,
    },
  ];

  @Input() mode;
  @Input() id;
  editId: any;
  isDefault = false;
  selectedApartment: any;
  selectedApartmentBlocks: any;
  selectedApartmentFloors: any;
  selectedAddressType: string;

  constructor(public modalController: ModalController, private fb: FormBuilder, private http: HttpClient, private commonService: commonService) {
    this.addressForm = this.fb.group({
      'userName': ['', Validators.required],
      'apartmentName': ['', Validators.required],
      'houseNo': ['', Validators.required],
      'blockNo': ['', Validators.required],
      'floorNo': ['', Validators.required],
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
          this.isDefault = res['response'].customerDetails?.address[0]?.isDefault;
          for (let i = 0; i < this.radio_list.length; i++) {
            this.radio_list[i].checked = false;
            if (res['response'].customerDetails?.address[0]?.typeOfAddress.toLowerCase() == this.radio_list[i].value.toLowerCase()) {             
              this.radio_list[i].checked = true;
              this.selectedAddressType = this.radio_list[i].value
            }
          }
        })
    } else {
      this.addressForm.reset();
      this.selectedAddressType = this.radio_list[0].value
    }
    console.log(this.selectedAddressType);    
  }

  onSelectionChange(val) {
    console.log(val);
    this.isDefault = val.detail.checked;
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
        "floorNo": this.addressForm.value.floorNo,
        "block": this.addressForm.value.blockNo,
        "address": this.addressForm.value.address,
        "landMark": this.addressForm.value.landmark,
        "contactNumber": this.addressForm.value.mblNo,
        "typeOfAddress": this.selectedGroup,
        "isDefault": this.isDefault
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
    this.selectedGroup = event.detail.value;
  }

  radioSelect(event) {
    console.log("radioSelect", event.detail);
    this.selectedItem = event.detail;
  }

  async navigateToApartmentList(ev: any) {
      const modal = await this.modalController.create({
        component: SelectApartmentComponent,
        cssClass: 'apartment_selection'
      });
      await modal.present();
      modal.onDidDismiss().then((data) => { 
        console.log(data['data']);
        this.selectedApartment = data?.data?._id;
        this.selectedApartmentBlocks = data?.data?.apartmentBlocks;
        this.selectedApartmentFloors = data?.data?.apartmentFloors;
        this.addressForm.patchValue({
          apartmentName: data?.data?.apartmentName
        })
        console.log('onDidDismiss resolved with role', this.addressForm);
      });
    }

    async navigateToApartmentBlockList(ev: any) {
      const modal = await this.modalController.create({
        component: SelectBlockComponent,
        cssClass: 'apartment_selection',
        componentProps: {selectedApartmentBlocks : this.selectedApartmentBlocks}
      });
      await modal.present();
      modal.onDidDismiss().then((data) => { 
        console.log(data['data']);
        this.addressForm.patchValue({
          blockNo: data?.data
        })
        console.log('onDidDismiss resolved with role', this.addressForm);
      });
    }

    async navigateToApartmentFloorList(ev: any) {
      const modal = await this.modalController.create({
        component: SelectFloorComponent,
        cssClass: 'apartment_selection',
        componentProps: {selectedApartmentFloors : this.selectedApartmentFloors}
      });
      await modal.present();
      modal.onDidDismiss().then((data) => { 
        console.log(data['data']);
        this.addressForm.patchValue({
          floorNo: data?.data
        })
        console.log('onDidDismiss resolved with role', this.addressForm);
      });
    }
}
