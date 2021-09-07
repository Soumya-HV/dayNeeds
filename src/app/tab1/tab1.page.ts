import { Component, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { SideMenuComponent } from '../side-menu/side-menu.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
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
    zoom: {
      maxRatio: 5
    }
  };
  categorySliderOpts = {
    slidesPerView: 4,
    autoplay: true,
    speed: 1000,
    zoom: {
      maxRatio: 5
    }
  }
  constructor(public modalController: ModalController) {

  }


  async openSideModal() {
    const modal = await this.modalController.create({
      component: SideMenuComponent,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

}
