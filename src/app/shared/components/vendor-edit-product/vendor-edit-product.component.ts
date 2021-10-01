import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vendor-edit-product',
  templateUrl: './vendor-edit-product.component.html',
  styleUrls: ['./vendor-edit-product.component.scss'],
})
export class VendorEditProductComponent implements OnInit {
  @Input() details; 
  unit: any;
  itemName: any;
  itemPrice: any;
  isActive: boolean;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.details);
    if (this.details != undefined) {
       this.itemName = this.details.itemName, this.itemPrice = this.
        details.itemPrice, this.isActive = this.details.active
    } else {
       this.itemName = ''; this.itemPrice = ''; this.isActive = false;
    }
    
  }

  submitForm() {
    console.log(this.isActive);
    
    this.modalController.dismiss({itemName: this.itemName,  itemPrice:this.itemPrice, isActive: this.isActive});
  }


closeModal() {
  this.modalController.dismiss();
} 

}
