import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-type-selection',
  templateUrl: './user-type-selection.component.html',
  styleUrls: ['./user-type-selection.component.scss'],
})
export class UserTypeSelectionComponent implements OnInit {
  userType: any;
  customerRegisterForm: FormGroup;
  constructor(private route: Router, private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.customerRegisterForm = this.fb.group({
      'userName': ['', Validators.required],
      'userMail': ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit() { }

  registerVendor() {
    this.route.navigate(['register/user']);
  }

  registerCustomer() {
    this.route.navigate(['tab/home']);
  }

  selectEvent(userType) {
    localStorage.setItem('userType', userType);
    this.userType = userType;
    console.log(this.userType);

    (userType == 'Vendor') ? '' : ''
  }

  submitRegForm() {
    console.log(this.customerRegisterForm.value);
    this.http.post<any>(`https://ygn8q40qaf.execute-api.ap-south-1.amazonaws.com/prod/createNewUser`, {
      "phoneNumber": Number(localStorage.getItem('phoneNum')),
      "typeOfUser": "Customer"
    }).subscribe(res => {
      //temporarily redirecting it to home screen, it should redirect to google map screen if he is customer
      console.log(res);
      this.router.navigate(['tab/home']);
    });
  }
}
