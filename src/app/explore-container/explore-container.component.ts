import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  noOfProducts: number = 1;
  tabSelectedModel = 'orderplaced';
  orderDetails = [{ id: 1, apartmentName: 'Skandha', deliveryTime: 'Today 4:00pm', products: [{ houseNo: 1, blockNo: 'A', prodName: 'Nandini Special Toned Milk', qty: '1000ml' }] },
  { id: 2, apartmentName: 'Home Garden', deliveryTime: 'Today 6:00pm', products: [{ houseNo: 1, blockNo: 'C', prodName: 'Nandini Milk', qty: '500ml' }] }]
  @Input() name: string;

  constructor() { }

  ngOnInit() {}

}
