import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';
import * as env from '../../environments/environment';
@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShopDetailsComponent implements OnInit {
  weekLists=[];
  vendorId;
  loginId;
  itemLists=[];
  curentDate = new Date();
  constructor(public modalController: ModalController,private http: HttpClient,public navParams: NavParams) {
    this.vendorId = this.navParams.get('data');
    console.log('vendorId',this.vendorId);
    this.loginId = localStorage.getItem('loginId');
    this.getItemsByVendor();
   }
 
  ngOnInit() {
    this.constructWeek();
  }

  constructWeek(){
    for(var i=0;i<=6;i++){
      this.weekLists.push(
        {
          date: moment(this.curentDate).add(i, 'days').format("DD-MM-YYYY"),
          week: moment(this.curentDate).add(i, 'days').format("ddd"),
          num: moment(this.curentDate).add(i, 'days').format("DD"),
        }
      );
    }
  }
  
  getItemsByVendor(){
    this.http.get(env.environment.url+'items/vendor/'+this.vendorId+'/user/'+this.loginId).subscribe
    (res => {
      this.itemLists = res['response'];
      console.log(this.itemLists);
    });
  }

  closeModal(){
    this.modalController.dismiss();
  }

  addCart(item){
    // for (var i=0;i<this.itemLists['priceList'].length;i++){
    //   if(item._id == this.itemLists['priceList'][i]._id){
    //     this.itemLists[i].selectedPrice = this.itemLists['priceList'][i]
    //   }
    // }
    // console.log(item);
  }

}
