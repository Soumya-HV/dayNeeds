import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as env from '../../../environments/environment'
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class commonService {
  cartScreen: boolean;
  userDetails: any;
  customerAccount: boolean;
  vendorAccount: boolean;
  storePriceValue: any;
  unitSelected = [];
  showTabs = true;
  checkoutAmount: any;
  customerdeliveryAddress: any;
  isLoading = false;
  constructor(private http: HttpClient, private router: Router, public loadingController: LoadingController) {
  }

  getUseridDetails() {
    this.http.get(env.environment.url + 'user/' + localStorage.getItem('user_id')).subscribe
      (res => {
        this.userDetails = res['response'];
        localStorage.setItem('loginId', this.userDetails._id);
        console.log(res, this.userDetails);
        if (this.userDetails?.customerDetails) {
          this.customerdeliveryAddress = this.userDetails.customerDetails?.address[0];
          this.customerAccount = true;
        } else {
          this.customerAccount = false;
        }
        if (this.userDetails?.vendorDetails) {
          this.vendorAccount = true;
        } else {
          this.vendorAccount = false;
        }
        if (localStorage.getItem('userType') == 'vendor') {
          this.router.navigate(["vendor/home"]);
        } else {
          this.router.navigate(["customer/home"]);
        }
      });
  }
  getandStoreuserLocalId() {
    this.present();
    this.http.get(env.environment.url + 'user/' + localStorage.getItem('user_id')).subscribe
      (res => {
        this.dismiss();
        localStorage.setItem('loginId', res['response']._id);
        console.log(res['response']._id);
      });
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }


}
