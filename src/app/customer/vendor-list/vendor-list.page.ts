import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ModalController } from '@ionic/angular';
import { ShopDetailsComponent } from '../../shop-details/shop-details.component';

@Component({
  selector: 'app-vendor-list',
  templateUrl: 'vendor-list.page.html',
  styleUrls: ['vendor-list.page.scss']
})
export class VendorListPage {
  categories = [
    {
      'img': '../../assets/images/cat-1.svg',
      'bgColor': '#DDEDEA',
      'name': 'veggies'
    },
    {
      'img': '../../assets/images/cat-2.svg',
      'bgColor': '#FCF4DD',
      'name': 'Fruits'
    },
    {
      'img': '../../assets/images/cat-3.svg',
      'bgColor': '#DAEAF6',
      'name': 'Food'
    },
    {
      'img': '../../assets/images/cat-4.svg',
      'bgColor': '#FCE1E4',
      'name': 'Meat'
    },
  ]
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
  constructor(public modalController: ModalController, private router: Router) {

  }

  backHome() {
    this.router.navigate(['customer/home'])
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