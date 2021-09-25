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
  selectedDropdown = [];
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
    public modalController: ModalController, private cmnService: commonService) {

    this.userType = localStorage.getItem('userType');
    console.log("userType", this.userType)
    this.customerRegisterForm = this.fb.group({
      'userName': ['', Validators.required],
      'userMail': ['', [Validators.required, Validators.email]]
    });
    this.vendorRegisterForm = this.fb.group({
      'shopName': ['', Validators.required],
      'userName': ['', Validators.required],
      'userMail': ['', [Validators.required, Validators.email]],
      'phoneNumber': ['', [Validators.required]]
    })
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
    console.log(this.vendorRegisterForm.value);
    let body = {
    }
    if (this.userType != 'customer') {
      body['phoneNumber'] = Number(localStorage.getItem('phoneNum')),
        body['typeOfUser'] = "Customer",
        body['email'] = this.customerRegisterForm.value.userMail,
        body['userName'] = this.customerRegisterForm.value.userName,
        body['firebaseUId'] = localStorage.getItem('user_id')

      this.http.post<any>(env.environment.url + 'createNewUser', body).subscribe(res => {
        console.log(res);
        this.router.navigate(['customer/home']);
        this.cmnService.getUseridDetails();
        // this.router.navigate(['user/location']);
      
      });
    } else {
      var categoryId = [];
      console.log(this.selectedDropdown);
      for (var i = 0; i < this.selectedDropdown.length; i++) {
        if (this.selectedDropdown[i].checked) {
          categoryId.push(this.selectedDropdown[i]._id)
          console.log(categoryId);
        }
      }
      body['phoneNumber'] = this.vendorRegisterForm.value.phoneNumber,
        body['typeOfUser'] = "Vendor",
        body['shopName'] = this.vendorRegisterForm.value.shopName,
        body['vendorName'] = this.vendorRegisterForm.value.userName,
        body['email'] = this.vendorRegisterForm.value.userMail,
        body['categoryId'] = categoryId.toString(),
        body['firebaseUId'] = localStorage.getItem('user_id')
      console.log(body)
      this.http.post<any>(env.environment.url + 'createNewUser', body).subscribe(res => {
        console.log(res);
        this.router.navigate(['customer/home']);
        this.cmnService.getUseridDetails();
        localStorage.setItem('userType','vendor');
        // this.router.navigate(['user/location']);
      
      });
    }



  }

  async openCategoryList() {
    const modal = await this.modalController.create({
      component: SelectCategory,
      componentProps: { "data": JSON.stringify(this.selectedDropdown) },
      cssClass: 'categoryMenuModal'
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.selectedDropdown = data['data'];
    });
    return await modal.present();
  }

  createVendor() {

    let params = {
      "vendorName": "V-Raju",
      "phoneNumber": 9827192719,
      "categoryId": "6130c633a1b1830b881b2d38",
      "email": "raju@gmail.com",
      "shopName": "Raju Vegitable Shop",
      "typeOfUser": "Vendor"
    }
  }

  closeModal() {
    localStorage.setItem('userType', 'customer');
    this.modalController.dismiss();
  }


}
