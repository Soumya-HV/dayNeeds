import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';

@Component({
  selector: 'app-vendor-add-offer',
  templateUrl: './vendor-add-offer.component.html',
  styleUrls: ['./vendor-add-offer.component.scss'],
})
export class VendorAddOfferComponent implements OnInit {
  @Input() offerDetails;
  unit: any;
  discount: any;
  item: any
  offerPrice: any;
  enableBackdropDismiss = false;
  showBackdrop = false;
  shouldPropagate = false;


  constructor(private modalController: ModalController, private commonService: commonService) {
  }

  ngOnInit() {
    console.log('offer details', this.offerDetails);
    if (this.offerDetails != undefined) {
      this.unit = Number(this.offerDetails.units), this.discount = Number(this.offerDetails.discount), this.item = Number(this.
        offerDetails.itemPrice), this.offerPrice = Number(this.offerDetails.offerPrice)
    } else {
      this.unit = 0; this.offerPrice = 0; this.discount = 0; this.item = 0;
    }
}

calcOfferPRice() {
  this.offerPrice = Math.round((this.unit) * ((this.item) - (this.item * this.discount / 100)));
}

closeModal() {
  this.modalController.dismiss();
} 

submitForm() {
  this.modalController.dismiss();
  this.commonService.storePriceValue = {};
  this.commonService.storePriceValue = {id: (this.offerDetails != undefined ? this.offerDetails.id : 0), units:this.unit, discount:this.discount, offerPrice:this.offerPrice,  itemPrice:this.item};
}

}
