import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import * as env from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    
    confirmationResult: firebase.auth.ConfirmationResult;

    constructor(private http: HttpClient,
        private fireAuth: AngularFireAuth) {
    }

    getToken() {
        return !!localStorage.getItem('tokenId')
    }

    getUserType(){
        
    }

    registerEvent(body) {
        return this.http.post(env.environment.url + 'login', body);
    }


    public signInWithPhoneNumber(phoneNumber, recaptchaVerifier,) {
        return new Promise<any>((resolve, reject) => {
            this.fireAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
                .then((confirmationResult) => {
                    this.confirmationResult = confirmationResult;
                    resolve(confirmationResult);
                }).catch((error) => {
                    console.log(error);
                    reject('SMS not sent');
                });
        });
    }

    public async enterVerificationCode(code) {
        console.log(code);
        return new Promise<any>((resolve, reject) => {
            this.confirmationResult.confirm(code).then(async (result) => {
                console.log(result);
                const user = result;
                resolve(user);
            }).catch((error) => {
                reject(error.message);
            });

        });
    }
}
