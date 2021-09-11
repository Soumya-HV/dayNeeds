import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { commonService } from '../core/services/common-service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  noOfProducts : number = 1;
  stockLists = [{id: 1, image: '../../assets/images/chilli.svg', pName: 'Green Chilli', qty: '100g', price: 80, qtyno:1},
  {id: 2, image: '../../assets/images/tomato.svg', pName: 'Tomato', qty: '1kg', price:100, qtyno:1}];
  constructor(private router:Router, private tabService: commonService) { }

  ngOnInit() {}

  reduceNumber() {
    if(this.noOfProducts > 0) {
      this.noOfProducts -= 1;
    }
  }

  increaseNumber() {
    this.noOfProducts += 1;
  }

  backHome(){
    this.router.navigate(['tab/tab2']);
    this.tabService.cartScreen = false;
  }

  displayImg() {

  }
}
