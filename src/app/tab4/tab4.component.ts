import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
})
export class Tab4Component implements OnInit {
  noOfProducts: number = 1;
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
    console.log('Segment changed', ev);
  }
}
