import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.page.html',
  styleUrls: ['product-list.page.scss']
})
export class ProductListPage {
  products = [
    { id: 1, catName: 'Vegetables', list: [{ productName: 'Tomatoes', price: '70/kg' }, { productName: 'Beetroot', price: '30/kg' }] },
    { id: 12, catName: 'Dairy Products', list: [{ productName: 'Milk', price: '30/lt' }, { productName: 
      'Curd', price: '20/cup' }] },
  ];
  constructor() { }

}
