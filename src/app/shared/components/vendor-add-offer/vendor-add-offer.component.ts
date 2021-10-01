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
  @Input() unitSelected;
  quantity: any;
  discount: any;
  item: any
  offerPrice: any;
  enableBackdropDismiss = false;
  showBackdrop = false;
  shouldPropagate = false;
  unitChoosen: any;

  constructor(private modalController: ModalController, private commonService: commonService) {
  }

  ngOnInit() {
    console.log('offer details', this.offerDetails, this.quantity, this.discount, this.item, this.unitSelected);
    if (this.offerDetails != undefined) {
      this.quantity = Number(this.offerDetails.quantity), this.discount = Number(this.offerDetails.discount),
       this.item = Number(this.
        offerDetails.priceOfItem),
         this.offerPrice = Number(this.offerDetails.offerPrice);
         this.unitChoosen = this.offerDetails.unit;
        console.log(this.quantity, this.offerPrice, this.item, this.discount, this.unitChoosen);        
    } else {
      this.quantity = 0; this.offerPrice = 0; this.discount = 0; this.item = 0;
    }

    this.unitChoosen = (this.unitSelected != undefined) ? this.unitSelected[0].name : ''
    
  }

  calcOfferPRice() {
    console.log('event', this.quantity, this.item, this.offerPrice, this.discount );    
    this.offerPrice = Math.round((this.quantity) * ((this.item) - (this.item * this.discount / 100)));
  }

  closeModal() {
    this.modalController.dismiss();
  }

  addCart(unit,event) {
    console.log(unit, event);    
    this.unitChoosen = event.detail.value.name 
  }

  submitForm() {
    console.log(this.offerDetails, this.offerPrice);
    this.commonService.storePriceValue = {};
    this.modalController.dismiss();
    this.commonService.storePriceValue = { id: (this.offerDetails != undefined ? this.offerDetails.id : 0), quantity: this.quantity, discount: this.discount, offerPrice: this.offerPrice, priceOfItem: this.item, unit: this.unitChoosen };
  }

}
