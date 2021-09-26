import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as env from '../../../environments/environment'
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class commonService {
    cartScreen: boolean;
    userDetails: any;
    customerAccount: boolean;
    vendorAccount : boolean;
    constructor(private http: HttpClient,private router: Router) {
    }

    getUseridDetails() {
        this.http.get(env.environment.url + 'user/' + localStorage.getItem('user_id')).subscribe
          (res => {
            this.userDetails = res['response'];
            console.log(res, this.userDetails);
            if(this.userDetails?.customerDetails){
              this.customerAccount = true;
            } else{
              this.customerAccount = false;
            }
            if(this.userDetails?.vendorDetails){
              this.vendorAccount = true;
            } else{
              this.vendorAccount = false;
            }
            if(localStorage.getItem('userType')== 'vendor'){
              this.router.navigate(["vendor/home"]);
            } else{
              this.router.navigate(["customer/home"]);
            }
          });
      }


}
