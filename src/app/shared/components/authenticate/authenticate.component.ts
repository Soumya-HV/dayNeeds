import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from 'src/app/core/services/auth.service';

import firebase from 'firebase/app';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent implements OnInit {
  ionicForm: FormGroup;
  OTPSuccess = false;
  IsOTPBeingEntered = false;
  userName: any;
  mobileNumber: any;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService,
    private alertController: AlertController,
    private http: HttpClient,
    private auth: AngularFireAuth) {
    this.ionicForm = this.fb.group({
      userName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
   })
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
    
  }
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }

  submitForm(value) {
    this.IsOTPBeingEntered = true;
    // this.router.navigate(['login/authenticate'])
    console.log(this.ionicForm, this.mobileNumber);
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value);

      this.authService.registerEvent(this.ionicForm.value).subscribe(res => {
        console.log(res);        
      });
    }
  }

  signinWithPhoneNumber($event) {
    console.log('country',this.recaptchaVerifier);

    if ('+91 - 9741220416') {
      this.authService
        .signInWithPhoneNumber(
          this.recaptchaVerifier,
          '+91 - 9741220416'
        )
        .then((success) => {
          this.OtpVerification();
        });
    }
  }

  async OtpVerification() {
    const alert = await this.alertController.create({
      header: 'Enter OTP',
      backdropDismiss: false,
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Enter your otp',
        },
      ],
      buttons: [
        {
          text: 'Enter',
          handler: (res) => {
            this.authService.enterVerificationCode(res.otp).then((userData) => {
              this.showSuccess();
              console.log(userData);
              console.log(userData.uid);
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async showSuccess() {
    let textMsg: string = 'Success';
    const token = await (await this.auth.currentUser).getIdToken(true);
    console.log('token', token);
    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
    this.http.get<any>(`https://ygn8q40qaf.execute-api.ap-south-1.amazonaws.com/prod/hello`, header)
    .subscribe(
      async (data) => {
        console.log(data);
        textMsg = data.message;
        const alert = await this.alertController.create({
          header: textMsg,
          buttons: [
            {
              text: 'Ok',
              handler: (res) => {
                alert.dismiss();
              },
            },
          ],
        });
        alert.present();
      },
      (err) => {
        console.log(err);
      }
    );

  }


  // submitForm() {
  //   this.IsOTPBeingEntered = true;
  //   // this.router.navigate(['tab/home'])
  //   console.log(this.ionicForm.value);
  //   if (!this.ionicForm.valid) {
  //     console.log('Please provide all the required values!')
  //     return false;
  //   } else {
  //     console.log(this.ionicForm.value);

  //     this.authService.registerEvent(this.ionicForm.value).subscribe(res => {
  //       console.log(res);        
  //     });
  //     // https://ygn8q40qaf.execute-api.ap-south-1.amazonaws.com/prod/login
  //   }
  // }

  get errorControl() {
    return this.ionicForm.controls;
  }


}
