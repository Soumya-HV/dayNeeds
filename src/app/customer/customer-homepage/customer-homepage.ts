import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { commonService } from '../../core/services/common-service';
import { SideMenuComponent } from '../../side-menu/side-menu.component';
import * as env from '../../../environments/environment';
import { NotificationComponent } from '../../shared/components/notification/notification.component';

@Component({
  selector: 'app-customer-homepage',
  templateUrl: 'customer-homepage.html',
  styleUrls: ['customer-homepage.scss']
})
export class CustomerHomePage {
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
  constructor(public modalController: ModalController, private http: HttpClient, private commonService: commonService) {
    this.getUserDetails();
    this.getCategories();
  }

  async openSideModal(name) {
    let cname = (name == 'notification') ? NotificationComponent : SideMenuComponent
    const modal = await this.modalController.create({
      component: cname,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  getUserDetails() {
    this.http.get(env.environment.url + 'user/' + localStorage.getItem('user_id')).subscribe
      (res => {
        this.commonService.userDetails = res['response'];
        console.log(res, this.commonService.userDetails);
      });
  }

  getCategories() {
    this.http.get(env.environment.url + 'categories').subscribe
      (res => {
        console.log("category lists" + res);
      });
  }

}
