import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-type-selection',
  templateUrl: './user-type-selection.component.html',
  styleUrls: ['./user-type-selection.component.scss'],
})
export class UserTypeSelectionComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {}

  registerVendor() {
    this.route.navigate(['register/user']);
  }

  registerCustomer() {
    // this.route.navigate(['home']);
  }
}
