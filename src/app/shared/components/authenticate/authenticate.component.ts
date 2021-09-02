import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent implements OnInit {
  OTPSuccess = false;
  IsOTPBeingEntered = false;
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.OTPSuccess = true;
    }, 500);
  }

  EnterOTPPanel() {
    this.IsOTPBeingEntered = true;
    this.router.navigate(['/login/authenticate'])
  }

}
