import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/core/services/auth.service';
// declare var SMSReceive: any;
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OTPComponent implements OnInit {
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  OTPForm: FormGroup;

  constructor(private authService: AuthService,
    private fb: FormBuilder, private router: Router, private fireAuth: AngularFireAuth, private http: HttpClient) {
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
      this.router.navigate(['tab/home']);
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
    // this.phoneLogin()
  }

  // phoneLogin() {
  //   console.log(this.recaptchaVerifier);
  //   this.authService.signInWithPhoneNumber(this.recaptchaVerifier, '+91 - 8754820831')
  //     .then((success) => {
  //       alert(success.verificationId);
  //       console.log(success.verificationId);
  //     }).catch((error: any) => alert("error" + error));
  // }

  // resendOtp(){
  //   // console.log(this.recaptchaVerifier);
  //   // this.authService.signInWithPhoneNumber(this.recaptchaVerifier, '+91 - 8754820831')
  //   //   .then((success) => {
  //   //     alert(success.verificationId);
  //   //     console.log(success.verificationId);
  //   //   }).catch((error: any) => alert("error" + error));

  //   this.ionViewDidEnter();
  // }





  // startWatch() {
  //   alert('start watching')
  //   this.smsRetriever.startWatching().then((res: any) => {
  //     alert(res);
  //   }).catch((error: any) => alert("error" + error));
  // }


  // start() {
  //   SMSReceive.startWatch(
  //     () => {
  //       document.addEventListener('onSMSArrive', (e: any) => {
  //         var IncomingSMS = e.data;
  //        alert(IncomingSMS)
  //       });
  //     },
  //     () => { console.log('watch start failed') }
  //   )
  // }

  // stop() {
  //   SMSReceive.stopWatch(
  //     () => { console.log('watch stopped') },
  //     () => { console.log('watch stop failed') }
  //   )
  // }

}
