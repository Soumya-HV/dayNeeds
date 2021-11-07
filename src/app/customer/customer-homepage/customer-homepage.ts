import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { commonService } from '../../core/services/common-service';
import { SideMenuCustomerComponent } from '../../sidemenu-customer/sidemenu-customer.component';
import * as env from '../../../environments/environment';
import { NotificationComponent } from '../../shared/components/notification/notification.component';
import { NavigationExtras, Router } from '@angular/router';
import { ManageAddressComponent } from 'src/app/shared/components/manage-address/manage-address.component';

@Component({
  selector: 'app-customer-homepage',
  templateUrl: 'customer-homepage.html',
  styleUrls: ['customer-homepage.scss']
})
export class CustomerHomePage {
  categories : any;
  dabbastoriesLists: any;
  dummy = Array(10);
  
  @ViewChild('mySlider') slider: IonSlides;
  @ViewChild('categorySlider') catslider: IonSlides;
  sliderOpts = {
    autoplay: true,
    speed: 1000,

  };
  categorySliderOpts = {
    slidesPerView: 4,
    autoplay: true,
    speed: 1000,

  }
  addressSelected: any;
  constructor(public modalController: ModalController, private http: HttpClient, private cmnService: commonService ,private router : Router) {
   
    // this.getDabbaStoriesList();
    this.addressSelected = this.cmnService.customerdeliveryAddress;
  }

  ionViewWillEnter(){
    this.dummy = Array(10);
    this.getCategories();
  }

  async openSideModal(name) {
    let cname = (name == 'notification') ? NotificationComponent : SideMenuCustomerComponent
    const modal = await this.modalController.create({
      component: cname,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  async openModalAddress(name) {
    const modal = await this.modalController.create({
      component: ManageAddressComponent,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }


  getCategories() {
    this.http.get(env.environment.url + 'categories').subscribe
      (res => {
        this.getDabbaStoriesList();
        this.categories = res['response'];
        console.log(this.categories);
      // console.log("category lists"+res);
      });
  }



  navigateToVendorList(category){
    let navigationExtras: NavigationExtras = {
      queryParams: {
       "category_id":category._id
      }
    };
    this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
   this.router.navigate(['customer/vendor-list'],navigationExtras); 
  }

  getDabbaStoriesList(){
    this.http.get(env.environment.url + 'item/home-made-items').subscribe
    (res => {
      this.dummy =[];
      this.dabbastoriesLists = res['response'];
      console.log(this.dabbastoriesLists);
    });
  }

}
