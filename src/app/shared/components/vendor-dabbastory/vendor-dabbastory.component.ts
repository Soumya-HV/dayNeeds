import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';
import { VendorAddOfferComponent } from '../vendor-add-offer/vendor-add-offer.component';

@Component({
  selector: 'app-vendor-dabbastory',
  templateUrl: './vendor-dabbastory.component.html',
  styleUrls: ['./vendor-dabbastory.component.scss'],
})

export class VendorDabbastoryComponent implements OnInit {
  productDetailsForm: FormGroup;
  openModal = false;
  offerDetails = [{ id: 1, units: 2, discount: 10, offerPrice: 540, itemPrice: 300 }, { id: 2, units: 1, discount: 5, offerPrice: 80, itemPrice: 100 }];

  constructor(public modalController: ModalController, private fb: FormBuilder, private commonService: commonService) {
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

  async addMore() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: VendorAddOfferComponent,
      cssClass: 'addModalClass',
      componentProps: { mode: 'Add' }
    });
    modal.onDidDismiss().then((data) => {
      this.offerDetails.push(this.commonService.storePriceValue);
    });
    console.log(this.offerDetails);    
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
      componentProps: { mode: 'Edit', offerDetails: item }
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

  ngOnChanges() {
    console.log(this.commonService.storePriceValue );
    
    if (this.commonService.storePriceValue != undefined) {
      this.offerDetails.push(this.commonService.storePriceValue);
    }
  }

}
