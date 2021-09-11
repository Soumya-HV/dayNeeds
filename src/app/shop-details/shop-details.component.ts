import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss'],
})
export class ShopDetailsComponent implements OnInit {
  weekLists=[];
  curentDate = new Date();
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    for(var i=0;i<=6;i++){
      this.weekLists.push(
        {
          date: moment(this.curentDate).add(i, 'days').format("DD-MM-YYYY"),
          week: moment(this.curentDate).add(i, 'days').format("ddd"),
          num: moment(this.curentDate).add(i, 'days').format("DD"),
        }
      );
    }
    console.log(this.weekLists);
  }
  

  closeModal(){
    this.modalController.dismiss();
  }

}
