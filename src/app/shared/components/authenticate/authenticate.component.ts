import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent implements OnInit {
  ionicForm: FormGroup;
  OTPSuccess = false;
  IsOTPBeingEntered = false;
  constructor(private router: Router, public formBuilder: FormBuilder, private authService: AuthService) {
    this.ionicForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
   })
   }

  ngOnInit() {
    setTimeout(() => {
      this.OTPSuccess = true;
    }, 500);
  }

  submitForm() {
    this.IsOTPBeingEntered = true;
    this.router.navigate(['login/authenticate'])
    console.log(this.ionicForm.value);
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value);

      this.authService.registerEvent(this.ionicForm.value).subscribe(res => {
        console.log(res);        
      });
      // https://ygn8q40qaf.execute-api.ap-south-1.amazonaws.com/prod/login
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
  }


}
