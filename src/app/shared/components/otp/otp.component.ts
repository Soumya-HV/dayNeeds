import { Component, OnInit } from '@angular/core';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { AlertController } from '@ionic/angular/providers/alert-controller';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/core/services/auth.service';
// declare var SMSReceive: any;
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OTPComponent implements OnInit {
  recaptchaVerifier: any;

  constructor(private smsRetriever: SmsRetriever, private authService: AuthService,
    ) {
    // this.start();
  }

  ngOnInit() {
    
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
    this.phoneLogin()
  }

  phoneLogin() {
    console.log(this.recaptchaVerifier);
    this.authService.signInWithPhoneNumber(this.recaptchaVerifier, '+91 - 8754820831')
      .then((success) => {
        alert(success.verificationId);
        console.log(success.verificationId);
      }).catch((error: any) => alert("error" + error));
  }

  resendOtp(){
    // console.log(this.recaptchaVerifier);
    // this.authService.signInWithPhoneNumber(this.recaptchaVerifier, '+91 - 8754820831')
    //   .then((success) => {
    //     alert(success.verificationId);
    //     console.log(success.verificationId);
    //   }).catch((error: any) => alert("error" + error));

    this.ionViewDidEnter();
  }



  

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
