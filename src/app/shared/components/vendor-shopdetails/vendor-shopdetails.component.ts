import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-shopdetails',
  templateUrl: './vendor-shopdetails.component.html',
  styleUrls: ['./vendor-shopdetails.component.scss'],
})
export class VendorShopdetailsComponent implements OnInit {
 address = [{ _id: '1', deliverAddress: 'No:8, A-Block,Garuda Park Square, HVResidence, Bangalore - 560049', deliverNum: '99999 99999', shopName: 'RK Vegetables'},
 { _id: '2', deliverAddress: 'No:8, A-Block,Garuda Park Square, HVResidence, Bangalore - 560049', deliverNum: '99999 99999', shopName: 'CK Fruits'}];
  constructor() { }

  ngOnInit() {}

}
