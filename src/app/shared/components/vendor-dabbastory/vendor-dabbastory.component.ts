import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageOptions, CameraSource, CameraResultType, Camera } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { commonService } from 'src/app/core/services/common-service';
import { VendorAddOfferComponent } from '../vendor-add-offer/vendor-add-offer.component';
import * as env from '../../../../environments/environment'

@Component({
  selector: 'app-vendor-dabbastory',
  templateUrl: './vendor-dabbastory.component.html',
  styleUrls: ['./vendor-dabbastory.component.scss'],
})

export class VendorDabbastoryComponent implements OnInit {
  productDetailsForm: FormGroup;
  openModal = false;
  offerDetails = [];
  // offerDetails = [{ id: 1, quantity: 2, discount: 10, offerPrice: 540, priceOfItem: 300 }, { id: 2, units: 1, discount: 5, offerPrice: 80, itemPrice: 100 }];
  base64: string = "";
  uploadPic = false;

  constructor(public modalController: ModalController, private fb: FormBuilder, private commonService: commonService, private http: HttpClient) {
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
    console.log(this.productDetailsForm.value, this.offerDetails);
    let body = {
      "productImage": "https://cdn.pixabay.com/photo/2017/01/08/11/06/food-1962646__340.jpg",
      "itemCategory": "6130c60b7425520b88685f00",
      "itemName": this.productDetailsForm.value.name,
      "description": this.productDetailsForm.value.type,
      "unit": "PLATE",
      "pricePerUnit": this.productDetailsForm.value.price,
      "priceList": this.offerDetails,
      "userId": localStorage.getItem('user_id'),
      "isSubscribable": false,
      "isAvailable": true
    }
    console.log(body, env.environment.url + `item`);
    this.http.post(env.environment.url + `item`, body).subscribe(res => {
      console.log('ressss', res);
    });

  }

  pickImageFromGallery() {
    var options: ImageOptions = {
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl
    }
    Camera.getPhoto(options).then((result) => {
      this.base64 = result.dataUrl;
      this.uploadPic = true;
      console.log(result);
     let body={img: this.base64}
     const formData = new FormData();
     formData.append("file", body.img);
     
      this.http.put(env.environment.url + `upload`, formData, 
      {headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${localStorage.getItem('tokenId')}`,
          'X-Skip-Interceptor': '',
          'ContentType': 'multipart/form-data'
        },
      )}
      ).subscribe(res => {
        console.log('ressss', res);
      });
      
    }, (err) => {
      alert(err)
    })
  }

  async addMore() {
    // this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: VendorAddOfferComponent,
      cssClass: 'addModalClass',
      componentProps: { mode: 'Add' , unitSelected: [{name: 'Plt'}]}
    });
    modal.onDidDismiss().then((data) => {
      if (this.commonService.storePriceValue != undefined) {
        this.offerDetails.push(this.commonService.storePriceValue);
      }
    });
    return await modal.present();
  }

  closeModal() {
    this.modalController.dismiss();
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
      componentProps: { mode: 'Edit', offerDetails: item,  unitSelected: [{name: 'Plt'}] }
    });
    modal.onDidDismiss().then((data) => {
      for (let j = 0; j < this.offerDetails.length; j++) {
        if (this.commonService.storePriceValue.id == this.offerDetails[j].id) {
          this.offerDetails[j] = this.commonService.storePriceValue;
        }
      }
    });
    return await modal.present();
  }

  timeTrigger(time) {
    var date = new Date(this.productDetailsForm.value[`${time}Time`]);
    var cDate = moment(date).format('LT');
    (time == 'start') ? this.productDetailsForm.patchValue({ startTime: cDate }) : this.productDetailsForm.patchValue({ endTime: cDate })
  }

  ngOnChanges() {
    // console.log(this.commonService.storePriceValue);    
    // if (this.commonService.storePriceValue != undefined) {
    // this.offerDetails.push(this.commonService.storePriceValue);
    // }
  }

}
