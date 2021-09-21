import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
})
export class Tab4Component implements OnInit {
  noOfProducts: number = 1;
  tabSelectedModel = 'orderplaced';
  orderDetails = [{ id: 1, apartmentName: 'Skandha', deliveryTime: 'Today 4:00pm', products: [{ houseNo: 1, blockNo: 'A', prodName: 'Nandini Special Toned Milk', qty: '1000ml' }] },
  { id: 2, apartmentName: 'Home Garden', deliveryTime: 'Today 6:00pm', products: [{ houseNo: 1, blockNo: 'C', prodName: 'Nandini Milk', qty: '500ml' }] }]
  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  reduceNumber() {
    if (this.noOfProducts > 0) {
      this.noOfProducts -= 1;
    }
  }

  increaseNumber() {
    this.noOfProducts += 1;
  }


  closeModal() {
    this.modalController.dismiss();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail, this.tabSelectedModel);
  }
}
