import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';
import { SelectCategory } from 'src/app/shared/components/select-categories/select-categories.component';
import * as env from '../../../environments/environment';


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
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
    public modalController: ModalController,private cmnService: commonService) {
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
    this.http.get(env.environment.url + 'categories').subscribe(
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
      body['typeOfUser'] = "Customer",
      body['email'] = this.customerRegisterForm.value.userMail,
      body['userName'] = this.customerRegisterForm.value.userName,
      body['firebaseUId'] = localStorage.getItem('user_id')
    } else {
      body['phoneNumber'] = this.vendorRegisterForm.value.phoneNumber,
      body['typeOfUser'] = "Vendor",
      body['shopName'] = this.vendorRegisterForm.value.shopName,
      body['vendorName'] = this.vendorRegisterForm.value.userName,
      body['email'] = this.vendorRegisterForm.value.userMail,
      body['categoryId'] = [],
      body['firebaseUId'] = localStorage.getItem('user_id')
    }
    this.http.post<any>(env.environment.url + 'createNewUser', body).subscribe(res => {
      console.log(res);
      // this.router.navigate(['user/location']);
          this.router.navigate(['customer/home']);
    });
  }

  async openCategoryList(){
    const modal = await this.modalController.create({
      component: SelectCategory,
      cssClass: 'categoryMenuModal'
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
    });
    return await modal.present();
  }


}
