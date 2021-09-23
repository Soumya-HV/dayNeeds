import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { commonService } from '../app/core/services/common-service';
import * as env from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private platform: Platform,
    private authService: AuthenticationService,
    private http: HttpClient,
    private commonService: commonService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
          console.log('hello');
        }, false);
      });
      if (!this.authService.getToken()) {
        this.router.navigate(["welcome"]);
      } else {
        this.getUseridDetails();
        this.router.navigate(["customer/home"]);
      }
    });
  }

  getUseridDetails() {
    this.http.get(env.environment.url + 'user/' + localStorage.getItem('user_id')).subscribe
      (res => {
        this.commonService.userDetails = res['response'];
        console.log(res, this.commonService.userDetails);
        if(this.commonService.userDetails?.customerDetails){
          this.commonService.customerAccount = true;
        } else{
          this.commonService.customerAccount = false;
        }
        if(this.commonService.userDetails.response?.vendorDetails){
          this.commonService.vendorAccount = true;
        } else{
          this.commonService.vendorAccount = false;
        }
      });
  }

}
