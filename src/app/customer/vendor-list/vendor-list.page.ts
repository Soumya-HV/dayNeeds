import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides, ModalController } from '@ionic/angular';
import { ShopDetailsComponent } from '../../shop-details/shop-details.component';
import * as env from '../../../environments/environment';
@Component({
  selector: 'app-vendor-list',
  templateUrl: 'vendor-list.page.html',
  styleUrls: ['vendor-list.page.scss']
})
export class VendorListPage {

  categoryId: any;
  vendorList: any
  // categories = [
  //   {
  //     'img': '../../assets/images/cat-1.svg',
  //     'bgColor': '#DDEDEA',
  //     'name': 'veggies'
  //   },
  //   {
  //     'img': '../../assets/images/cat-2.svg',
  //     'bgColor': '#FCF4DD',
  //     'name': 'Fruits'
  //   },
  //   {
  //     'img': '../../assets/images/cat-3.svg',
  //     'bgColor': '#DAEAF6',
  //     'name': 'Food'
  //   },
  //   {
  //     'img': '../../assets/images/cat-4.svg',
  //     'bgColor': '#FCE1E4',
  //     'name': 'Meat'
  //   },
  // ]
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
  constructor(public modalController: ModalController,private http: HttpClient, private router: Router,private activatedRoute : ActivatedRoute) {
    activatedRoute.queryParams.subscribe(params => {
      this.categoryId = params.category_id;
      console.log(this.categoryId);
      if(this.categoryId){
        this.getVendorListbyCategoryId();
      } else{
        this.getVendorList();
      }
    })
  }

  ngOnInit(){
  }

  getVendorListbyCategoryId(){
    this.http.get(env.environment.url+'category/'+this.categoryId+'/vendors').subscribe
    (res => {
      this.vendorList = res['response'];
      console.log(this.vendorList);
    });

  }

  getVendorList(){
    this.http.get(env.environment.url+'vendors').subscribe
    (res => {
      this.vendorList = res['response'];
      console.log(this.vendorList);
    });
  }

  backHome() {
    this.router.navigate(['customer/home']);
  }

  async openShopDetail() {
    const modal = await this.modalController.create({
      component: ShopDetailsComponent,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

}
