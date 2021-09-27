import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-orders',
  templateUrl: 'vendor-orders.page.html',
  styleUrls: ['vendor-orders.page.scss']
})
export class VendorOrdersPage {
  // segment = 'placed';
  selectedRestaurantIdx: any;
  orderDetails = [
    {
      "id": 1,
      "apartmentName": "Skandha",
      "deliveryTime": "Today 4:00pm",
      "products": [
        {
          "segment": "placed",
          "orderPlaced": [
            {
              "name": "user1",
              "amount": "350",
              "status": "cod"
            },
            {
              "name": "user2",
              "amount": "350",
              "status": "paid"
            }
          ]
        },
        {
          "segemnt": "ontheway",
          "ontheway": [
            {
              "name": "user3",
              "amount": "500",
              "status": "cod"
            },
            {
              "name": "user4",
              "amount": "400",
              "status": "paid"
            }
          ]
        },
        {
          "segemnt": "delivered",
          "delivered": [
            {
              "name": "user5",
              "amount": "200",
              "status": "paid"
            },
            {
              "name": "user6",
              "amount": "450",
              "status": "paid"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "apartmentName": "Stivatsave",
      "deliveryTime": "Today 5:00pm",
      "products": [
        {
          "segment": "placed",
          "orderPlaced": [
            {
              "name": "user1",
              "amount": "350",
              "status": "cod"
            },
            {
              "name": "user2",
              "amount": "350",
              "status": "paid"
            }
          ]
        },
        {
          "segemnt": "ontheway",
          "ontheway": [
            {
              "name": "user3",
              "amount": "500",
              "status": "cod"
            },
            {
              "name": "user4",
              "amount": "400",
              "status": "paid"
            }
          ]
        },
        {
          "segemnt": "delivered",
          "delivered": [
            {
              "name": "user5",
              "amount": "200",
              "status": "paid"
            },
            {
              "name": "user6",
              "amount": "450",
              "status": "paid"
            }
          ]
        }
      ]
    }
  ]

  constructor() { }

  changeSegment(index: number) {
    this.selectedRestaurantIdx = index;
  }

}
