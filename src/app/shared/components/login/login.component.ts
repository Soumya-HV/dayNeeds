import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import firebase from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ionicForm: FormGroup;
  OTPSuccess = false;
  IsOTPBeingEntered = false;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  @Output() isNewUser = new EventEmitter();
  user;
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthenticationService,
    private alertController: AlertController,public cmnService: commonService,
    private http: HttpClient,
    private auth: AngularFireAuth) {
    this.ionicForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
    })
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
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

  submitForm() {
    this.IsOTPBeingEntered = true;
    let body = {
      mobileNumber: '+91 - ' + this.ionicForm.value.mobileNumber
    }
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      this.cmnService.present();
      this.authService.signInWithPhoneNumber(body.mobileNumber, this.recaptchaVerifier)
        .then((success) => {
          this.cmnService.dismiss();
          console.log(success);
          localStorage.setItem('phoneNum', this.ionicForm.value.mobileNumber);
          this.router.navigate(['otp']);
        }).catch((error: any) => console.log("error" + error));
    }
  }


  get errorControl() {
    return this.ionicForm.controls;
  }


}
