import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageOptions, CameraSource, CameraResultType, Camera } from '@capacitor/camera';
import { ModalController, PopoverController } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';
import { UnitSelectComponent } from '../unit-select/unit-select.component';
import { VendorAddOfferComponent } from '../vendor-add-offer/vendor-add-offer.component';
import * as env from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vendor-product',
  templateUrl: './vendor-product.component.html',
  styleUrls: ['./vendor-product.component.scss'],
})

export class VendorProductComponent implements OnInit {
  @Input() mode;
  productDetailsForm: FormGroup;
  openUnits = false;
  unitSelected: any;
  base64: string="";
  uploadPic = false;
  offerDetails = [{ id: 1, quantity: 2, discount: 10, offerPrice: 540, priceOfItem: 300, unit: 'gm' }, { id: 2, quantity: 1, discount: 5, offerPrice: 80, itemPrice: 100, unit: 'kg' }];
  unitLists = [{name: 'gm'}, {name: 'kg'}, {name: 'lt'}]

  constructor(public modalController: ModalController, private fb: FormBuilder, public popoverController: PopoverController, private commonService:commonService, private http:HttpClient) {
    this.productDetailsForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      unit: [[], Validators.required]
    })
  }

  ngOnInit() { }

  openUnitList() {
    this.openUnits = !this.openUnits;
   }

   unitSelect(val) {
     console.log('unit select', val.detail.value);     
   }

   selectCategory(event, unit, i) {
    this.unitSelected = unit;
   }

  closeModal() {
    this.modalController.dismiss();
  }

  loadImageFromDevice(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      let blobURL: string = URL.createObjectURL(blob);
    };
    reader.onerror = (error) => {
    };
  };

  submitForm() {
    this.modalController.dismiss();
    console.log(this.productDetailsForm.value);

    let body = {
      "productImage": "https://cdn.pixabay.com/photo/2017/01/08/11/06/food-1962646__340.jpg",
      "itemCategory": "6130c60b7425520b88685f00",
      "itemName": this.productDetailsForm.value.name,
      "description": this.productDetailsForm.value.type,
      "unit": this.productDetailsForm.value.unit,
      "pricePerUnit": this.productDetailsForm.value.price,
      "priceList": this.offerDetails,
      "userId": localStorage.getItem('user_id'),
      "isSubscribable": false,
      "isAvailable": true
    }
    this.http.post(env.environment.url + `item`, body).subscribe(res => {
      console.log('ressss', res);
    });
  }


  pickImageFromGallery(){
    var options:ImageOptions ={
      source:CameraSource.Photos,
      resultType:CameraResultType.DataUrl
    }
    Camera.getPhoto(options).then((result) =>{
      this.base64 = result.dataUrl;
      this.uploadPic = true;
    },(err)=>{
      alert(err)
    })
  }

  async addMore() {
    // this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: VendorAddOfferComponent,
      cssClass: 'addModalClass',
      componentProps: { mode: 'Add' , unitSelected: this.productDetailsForm.value.unit}
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      
      this.offerDetails.push(this.commonService.storePriceValue);
    });
    console.log(this.offerDetails);    
    return await modal.present();
  }
  
  removeOffer(item) {
    this.offerDetails.splice(0, 1);
    console.log(this.offerDetails);    
  }
  async editOffer(item) {
    // this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: VendorAddOfferComponent,
      cssClass: 'addModalClass',
      componentProps: { mode: 'Edit', offerDetails: item , unitSelected: [{name: item.unit}]}
    });
    modal.onDidDismiss().then((data) => {
      console.log(this.offerDetails);      
          for (let j = 0; j < this.offerDetails.length; j++) {
            if (this.commonService.storePriceValue.id == this.offerDetails[j].id) {
              this.offerDetails[j] = this.commonService.storePriceValue;
            }
        }         
    });
    return await modal.present();
  }

}
