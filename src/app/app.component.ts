import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { Platform } from '@ionic/angular';
import { Router,NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { commonService } from '../app/core/services/common-service';
import * as env from '../environments/environment';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  closed$ = new Subject<any>();
  // showTabs = true; // <-- show tabs by default
  constructor(
    private router: Router,
    private platform: Platform,
    private authService: AuthenticationService,
    private http: HttpClient,
    private cmnService: commonService) {
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
        // this.getUseridDetails();
        this.cmnService.getUseridDetails();
       
      }
    });
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.closed$)
    ).subscribe(event => {
      console.log("routing",event['url']);
      if (event['url'] === '/customer/mycart') {
        this.cmnService.showTabs = false; // <-- hide tabs on specific pages
      } else{
        this.cmnService.showTabs = true;
      }
    });
  }
  
  ngOnDestroy() {
    this.closed$.next(); // <-- close subscription when component is destroyed
  }

  // getUseridDetails() {
  //   this.http.get(env.environment.url + 'user/' + localStorage.getItem('user_id')).subscribe
  //     (res => {
  //       this.cmnService.userDetails = res['response'];
  //       console.log(res, this.cmnService.userDetails);
  //       if(this.cmnService.userDetails?.customerDetails){
  //         this.cmnService.customerAccount = true;
  //       } else{
  //         this.cmnService.customerAccount = false;
  //       }
  //       if(this.cmnService.userDetails.response?.vendorDetails){
  //         this.cmnService.vendorAccount = true;
  //       } else{
  //         this.cmnService.vendorAccount = false;
  //       }
  //     });
  // }

}
