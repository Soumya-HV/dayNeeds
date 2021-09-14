import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userType: any;
  categories = [];
  items = [];
  selectedCat = false;
  customerRegisterForm: FormGroup;
  vendorRegisterForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.userType = localStorage.getItem('userType');
    this.customerRegisterForm = this.fb.group({
      'userName': ['', Validators.required],
      'userMail': ['', [Validators.required, Validators.email]]
    });
    this.vendorRegisterForm = this.fb.group({
      'shopName': ['', Validators.required],
      'userName': ['', Validators.required],
      'userMail': ['', [Validators.required, Validators.email]],
      'phoneNumber': ['', [Validators.required]],
      'productsSold': [[], Validators.required]
    })
  }

  ngOnInit() {
    this.http.get('https://ygn8q40qaf.execute-api.ap-south-1.amazonaws.com/prod/categories').subscribe(
      res => {
        console.log('res',res['response']);
        this.categories = res['response'];
      }
    )
  }

  onChange() {   
    this.selectedCat = true;
    console.log('itemsss',this.items);
  }

  submitRegForm() {
    console.log(this.customerRegisterForm.value);
    let body = {
    }
    if(this.userType == 'customer') {
      body['phoneNumber'] = Number(localStorage.getItem('phoneNum')),
      body['typeOfUser'] = "Customer"
    } else {
      body['phoneNumber'] = this.vendorRegisterForm.value.phoneNumber,
      body['typeOfUser'] = "Vendor",
      body['shopName'] = this.vendorRegisterForm.value.shopName,
      body['vendorName'] = this.vendorRegisterForm.value.userName,
      body['email'] = this.vendorRegisterForm.value.email,
      body['categoryId'] = []

    }
    this.http.post<any>(`https://ygn8q40qaf.execute-api.ap-south-1.amazonaws.com/prod/createNewUser`, body).subscribe(res => {
      console.log(res);
      this.router.navigate(['user/location']);
    });
  }


}
