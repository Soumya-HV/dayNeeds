import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-type-selection',
  templateUrl: './user-type-selection.component.html',
  styleUrls: ['./user-type-selection.component.scss'],
})
export class UserTypeSelectionComponent implements OnInit {
  customerRegisterForm: FormGroup;
  constructor(private route: Router, private fb: FormBuilder, private http: HttpClient, private router: Router) {
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
    this.router.navigate(['register/user']);
  }
  
}
