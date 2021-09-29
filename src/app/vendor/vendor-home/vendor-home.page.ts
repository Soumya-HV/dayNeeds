import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { SideMenuVendorComponent } from 'src/app/sidemenu-vendor/sidemenu-vendor.component';
import * as env from '../../../environments/environment'

@Component({
  selector: 'app-vendor-home',
  templateUrl: 'vendor-home.page.html',
  styleUrls: ['vendor-home.page.scss']
})
export class VendorHomePage implements OnInit {

  constructor(public modalController: ModalController, private http: HttpClient, private cmnService: commonService) { }

  async openSideModal(name) {
    let cname = (name == 'notification') ? NotificationComponent : SideMenuVendorComponent
    const modal = await this.modalController.create({
      component: cname,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  ngOnInit() { 
    this.getUserDetails();
  }

  getUserDetails() {
    this.http.get(env.environment.url + 'user/' + localStorage.getItem('user_id')).subscribe
      (res => {
        this.cmnService.userDetails = res['response'];
        console.log(this.cmnService.userDetails);
      });
  }

}
