import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';
import { SelectCategory } from 'src/app/shared/components/select-categories/select-categories.component';
import * as env from '../../../environments/environment';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  userType: any;
  categories = [];
  items = [];
  selectedCat = false;
  customerRegisterForm: FormGroup;
  // vendorRegisterForm: FormGroup;
  selectedDropdown = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
    public modalController: ModalController, private cmnService: commonService) {
    this.userType = localStorage.getItem('userType');
    console.log("userType", this.userType)
    this.customerRegisterForm = this.fb.group({
      'userName': ['', Validators.required],
      'userMail': ['', [Validators.required, Validators.email]]
    });
    // this.vendorRegisterForm = this.fb.group({
    //   'shopName': ['', Validators.required],
    //   'userName': ['', Validators.required],
    //   'userMail': ['', [Validators.required, Validators.email]],
    //   'phoneNumber': ['', [Validators.required]]
    // })
  }

  ngOnInit() {
    this.http.get(env.environment.url + 'categories').subscribe(
      res => {
        console.log('res', res['response']);
        this.categories = res['response'];
      }
    )
  }

  onChange() {
    this.selectedCat = true;
    console.log('itemsss', this.items);
  }

  submitRegForm() {
    let body = {};
    // if (this.userType == 'customer') {
      body['phoneNumber'] = Number(localStorage.getItem('phoneNum')),
        body['typeOfUser'] = "Customer",
        body['email'] = this.customerRegisterForm.value.userMail,
        body['userName'] = this.customerRegisterForm.value.userName,
        body['firebaseUId'] = localStorage.getItem('user_id')
      this.http.post<any>(env.environment.url + 'createNewUser', body).subscribe(res => {
        console.log(res);
        localStorage.setItem('userType','customer');
        this.cmnService.getUseridDetails();
        // this.router.navigate(['user/location']);
      
      });
    // } 
    // else {
    //   var categoryId = [];
    //   console.log(this.selectedDropdown);
    //   for (var i = 0; i < this.selectedDropdown.length; i++) {
    //     if (this.selectedDropdown[i].checked) {
    //       categoryId.push(this.selectedDropdown[i]._id)
    //       console.log(categoryId);
    //     }
    //   }
    //    body['phoneNumber'] = this.vendorRegisterForm.value.phoneNumber,
    //     body['typeOfUser'] = "Vendor",
    //     body['shopName'] = this.vendorRegisterForm.value.shopName,
    //     body['vendorName'] = this.vendorRegisterForm.value.userName,
    //     body['email'] = this.vendorRegisterForm.value.userMail,
    //     body['categoryId'] = categoryId.toString(),
    //     body['firebaseUId'] = localStorage.getItem('user_id')
    //   console.log(body)
    //   this.http.post<any>(env.environment.url + 'createNewUser', body).subscribe(res => {
    //     console.log(res);
    //     this.router.navigate(['customer/home']);
    //     this.cmnService.getUseridDetails();
    //     localStorage.setItem('userType','vendor');
    //     // this.router.navigate(['user/location']);
      
    //   });
    // }
  }


  closeModal() {
    localStorage.setItem('userType','customer');
    this.cmnService.getUseridDetails();
    // if(this.userType=='customer'){
    //   this.router.navigate(['customer/home']);
    // } else{
    //   this.router.navigate(['vendor/home']);
    // }
  }

}
