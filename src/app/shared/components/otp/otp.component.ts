import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { commonService } from 'src/app/core/services/common-service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OTPComponent implements OnInit {
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  OTPForm: FormGroup;

  constructor(private authService: AuthenticationService,
    private fb: FormBuilder, private router: Router, private fireAuth: AngularFireAuth, private http: HttpClient,
    private cmnService: commonService) {
    this.OTPForm = this.fb.group({
      OTP: ['', Validators.required]
    })
  }

  ngOnInit() { }

  async submitOTPEventTrigger() {
    console.log('otp verify click');
    
    let val = this.OTPForm.value.OTP; 
    console.log(this.OTPForm.value, val);
    this.authService.enterVerificationCode(val).then((userData) => {
      this.showSuccess(userData);
      console.log(userData);
    });
  }

  async showSuccess(userData) {
    const token = await (await this.fireAuth.currentUser).getIdToken(true);
    localStorage.setItem('tokenId', token);
    localStorage.setItem('user_id', userData.user.uid);
    // console.log('tokenId', token, this.fireAuth.currentUser, userData.user.uid, localStorage.getItem('tokenId'));
    if (!userData?.additionalUserInfo?.isNewUser) {
      this.cmnService.getandStoreuserLocalId();
      this.router.navigate(['customer/home']);
    } else {
      console.log(localStorage.getItem('phoneNum'));
      this.router.navigate(['usertype-select']);
      // this.http.post<any>(`https://ygn8q40qaf.execute-api.ap-south-1.amazonaws.com/prod/createNewUser`, {
        // "phoneNumber": Number(localStorage.getItem('phoneNum')),
        // "typeOfUser": "Customer"
      // }).subscribe(res => {
        // console.log(res);
      // });
    }
  }


  async ionViewDidEnter() {
    console.log(this.recaptchaVerifier);
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }

    });
    console.log(this.recaptchaVerifier);
  }

}
